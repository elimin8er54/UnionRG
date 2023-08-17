import type { MongoClient } from 'mongodb';

type MLS = {
    location: string,
    minprice: string,
    maxprice: string,
    bedroom: string,
    bathroom: string,
    // bathroomhalf: string,
    currentpage: string,
    type: string
}

export const getMLS = async (mlsInfo: MLS, client: MongoClient, result: (error: null, final_val: {}) => void) => {

    const SKIP_AMOUNT = 8;

    try {

        let database = client.db();
        const location: { $eq?: string } = {};
        if (mlsInfo.location) { location['$eq'] = mlsInfo.location; }

        //First we get all the results from the town colletion
        let mlsTown = await database.collection("towns").find(
            {
                STATE: { $eq: "MA" },
                LONG: { ...location, $ne: null }
            },
            {
                projection:
                    { STATE: 1, LONG: 1, TOWN_NUM: 1, _id: 0 }
            }
        ).toArray();
        //We only want the towns so we split the results into just an array contataining the towns
        let onlyTowns = mlsTown.map((key: { TOWN_NUM: string }) => {
            return {
                TOWN_NUM: key.TOWN_NUM
            };
        });

        //Typescript and default values
        const pricemin: { $gte?: number } = {};
        const pricemax: { $lte?: number } = {};
        const bath: { $eq?: number } = {};
        const bed: { $eq?: number } = {};
        const bathhalf: { $eq?: number } = {};
        const propType: { $eq?: string } = {};


        //If the request is not empty then add it to the condition
        if (mlsInfo.minprice) { pricemin['$gte'] = parseInt(mlsInfo.minprice, 10); }
        if (mlsInfo.maxprice) { pricemax['$lte'] = parseInt(mlsInfo.maxprice, 10); }
        if (mlsInfo.bedroom) { bed['$eq'] = parseInt(mlsInfo.bedroom, 10); }
        if (mlsInfo.bathroom) { bath['$eq'] = parseInt(mlsInfo.bathroom, 10); }
        //  if (mlsInfo.bathroomhalf) { bathhalf['$eq'] = parseInt(mlsInfo.bathroomhalf, 10); }
        if (mlsInfo.type) { propType['$eq'] = mlsInfo.type; }

        //If the request existsed and if the value is not null in the database then get it
        let query: {}[] = [
            { LIST_PRICE: { ...pricemin, $ne: null } },
            { LIST_PRICE: { ...pricemax, $ne: null } },
            { NO_BEDROOMS: { ...bed, $ne: null } },
            { NO_FULL_BATHS: { ...bath, $ne: null } },
            { NO_HALF_BATHS: { ...bathhalf, $ne: null } },
            { PROP_TYPE: { ...propType, $ne: null } }
        ]

        //SELECT FROM properties WHERE QUERY(AND...AND...) AND TOWN(OR....OR....)

        const fullQuery = {
            $and: [{
                $and:
                    query
            },
            {
                $or:
                    onlyTowns
            }]
        };

        let mlsProperties = await database.collection("properties").find(
            fullQuery, {
            projection:
            {
                LIST_PRICE: 1,
                NO_BEDROOMS: 1,
                NO_FULL_BATHS: 1,
                NO_HALF_BATHS: 1,
                LIST_NO: 1,
                SQUARE_FEET: 1,
                ZIP_CODE: 1,
                STREET_NAME: 1,
                STREET_NO: 1,
                UNIT_NO: 1,
                _id: 0

            }
        }
        ).skip(parseInt(mlsInfo.currentpage, 10) * SKIP_AMOUNT).limit(SKIP_AMOUNT).toArray();







        //ANOTHER QUERY FOR THE TOTAL COUNT. CAUSE I DONT LIKE AGGREGAGTIONS
        let theCount = await database.collection("properties").find(
            fullQuery, { projection: { _id: 1 } }
        ).limit(450).toArray();




        //I MERGE THE INITIAL TOWN QUERY WITH THE PROPERTY QUERY BASED ON THE TOWN ID
        let final_val = mlsProperties.map((item, i) => Object.assign({}, item, ...mlsTown));


        //We send the response back with the total pages to show attached to the object
        result(null, { "total": Math.round(theCount.length / SKIP_AMOUNT), "values": final_val });
    } catch (err) {
        console.log(err);
    }
}

//I pass empty incase in the future we need something. Then it wont take long
export const getMLSTowns = async (mlsInfo: MLS, client: MongoClient, result: (error: null, final_val: {}) => void) => {
    try {
        let query: {} =
            { STATE: { $eq: "MA" } }
        const database = client.db();
        const mlsProperties = await database.collection("towns").find(
            query
        ).toArray();
        result(null, mlsProperties);
    } catch (err) {
        console.log(err);
    }
}


export const getMLSPropertyInfo = async (mlsInfo: any, client: MongoClient, result: (error: null, final_val: {}) => void) => {
    try {
        //We want to only get these keys then convert the vaules of them. Mostly for ameneties
        //We can add more if we ever want to convert other fields.
        const fields = [
            "ROOM",
            "APPLIANCES",
            "AMENITIES",
            "AIR_CONDITION",
            "BU_TYPE",
            "ENERGY_FEATURES",
            "EXTERIOR_FEATURES",
            "EXTERIOR_UNIT_FEATURES",
            "FLOORING",
            "INTERIOR_FEATURES",
            "UTILITIES",
            "HEATING",
            "COOLING",
            "ELECTRIC_FEATURE",
            "BASEMENT_FEATURE"

        ]




        let query: {} = { LIST_NO: { $eq: parseInt(mlsInfo.propertyID, 10) } };
        const database = client.db();
        let field = await database.collection("field").find({}).toArray();
        const mlsProperties = await database.collection("properties").find(
            query
        ).limit(1).toArray();
        let mlsTown = await database.collection("towns").find(
            {
                TOWN_NUM: { $eq: mlsProperties[0].TOWN_NUM }
            },
            {
                projection:
                    { STATE: 1, LONG: 1, TOWN_NUM: 1, _id: 0 }
            }
        ).toArray();


        //This goes through 2 collections.
        //First it traverses the properties checks to see which keys are in the array from earlier, which ones we care about converting. (fields[])
        //Then we compare those keys to another collection called field.
        //We then map the array of random letters/numbers to actual names based on the current keys that match in both collections for type "Field".
        //Ex. 12 would get mapped to be Granite Countertop.
        //We also have to make sure to only map if the key matches as well since the values from different keys can be the same.

        for (const [key] of Object.entries(mlsProperties[0])) {
            fields.forEach((element) => {
                if (key === element && mlsProperties[0][element] != null) {
                    mlsProperties[0][key] = mlsProperties[0][element].split(",").map((x: any) => {
                        let tempVal = "";
                        field.forEach((element2) => {
                            if (element2.Field === key && element2.Short === x) {
                                tempVal = element2.Long;
                            }
                        });
                        return tempVal;
                    });
                }
            })
        }





        let final_val = mlsProperties.map((item, i) => Object.assign({}, item, ...mlsTown));

        result(null, final_val);
    } catch (err) {
        console.log(err);
    }
}

