import React, { useEffect, useState } from 'react';
import ContactManager from '../reused/ContactManager';
import PhotoGallery from '../reused/PhotoGallery';
import PropertyInfoBox from '../reused/PropertyInfoBox';
import LocationMapper from '../reused/LocationMapper';
import { postRequest, filterAndChangeKey } from '../../helpers/main';
import type { RouteComponentProps } from 'react-router-dom';
import BillCalculator from '../reused/BillCalculator';
import { Skeleton } from "@material-ui/lab";




interface MatchParams {
    propertyID: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

//These are variables that I only need to set once.
let sideInfo: { key: string, value: unknown }[] = [];
let bottomLeftInfo: { key: string, value: unknown }[] = [];
let amenInfo: { key: string, value: unknown }[] = [];
const MAX_LOOPS = 8;
const PropertyInfo = (props: Props) => {

    const [srvData, setSrvData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [photos] = useState([]);
    const request = {
        propertyID: props.match.params.propertyID
    };

    const getForBoxes = (theInfo: { [k: string]: any }, stateInfo: { [k: string]: any }) => {
        let loopCount = 0;
        for (const [key, value] of Object.entries(theInfo)) {
            if (loopCount < MAX_LOOPS) {
                stateInfo.push({ key, value });
                loopCount++;
            } else {
                break;
            }
        }
    }


    const filterEmptyString = (elem: string[]) => {
        return elem.filter(function (el: any) {
            return el != '';
        });
    }

    let unitNo = "";
    useEffect(() => {

        if (!srvData) {
            setIsLoaded(false);
            postRequest("/mls/propertyinfo", request).then((data) => {
                //Limit is 1 in the server but mongodb really wants me to retreive values as an array
                setSrvData(data[0]);
            });
        } else {
            setIsLoaded(true);
            const getValues = {
                LIST_NO: { name: "MLS #" },
                STATUS: { name: "Status", value: function () { return "Available" } },
                TAXES: {
                    name: "Taxes", value: function () {
                        if (srvData.TAXES)
                            return parseFloat(srvData.TAXES).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })
                        else
                            return "N/A"
                    }
                },
                PROP_TYPE: {
                    name: "MLS Type", value: () => {
                        if (srvData.PROP_TYPE === "CC") return "Condo"
                        else if (srvData.PROP_TYPE === "MF") return "Multi Family"
                        else if (srvData.PROP_TYPE === "SF") return "Single Family"
                    }
                },
                YEAR_BUILT: { name: "Year Build" },
                HOA_FEE: {
                    name: "HOA Fee", value: () => {
                        if (srvData.HOA_FEE)
                            return srvData.HOA_FEE.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })
                        else
                            return "N/A";
                    }
                },
                COUNTY: { name: "County" },
            };

            const getValues2 = {
                LONG: { name: "Town" },
                GARAGE_SPACES: { name: "Garage Spaces" },
                PARKING_SPACES: { name: "Parking SPaces" },
                TOTAL_PARKING: { name: "Total Parking", },
            }



            const getValues3 = {
                ROOM: {
                    name: "Room", value: () => {
                        if (srvData.ROOM)
                            return filterEmptyString(srvData.ROOM).join(", ");
                        else
                            return "N/A";
                    }
                }, APPLIANCES: {
                    name: "Appliances", value: () => {
                        if (srvData.APPLIANCES)
                            return filterEmptyString(srvData.APPLIANCES).join(", ");
                        else
                            return "N/A";
                    }
                }, AMENITIES: {
                    name: "Amenities", value: () => {
                        if (srvData.AMENITIES)
                            return filterEmptyString(srvData.AMENITIES).join(", ");
                        else
                            return "N/A";
                    }
                }, AIR_CONDITION: {
                    name: "Air Condition", value: () => {
                        if (srvData.AIR_CONDITION)
                            return filterEmptyString(srvData.AIR_CONDITION).join(", ");
                        else
                            return "N/A";
                    }
                }, BU_TYPE: {
                    name: "BU Type", value: () => {
                        if (srvData.BU_TYPE)
                            return filterEmptyString(srvData.BU_TYPE).join(", ");
                        else
                            return "N/A";
                    }
                }, ENERGY_FEATURES: {
                    name: "Energy Features", value: () => {
                        if (srvData.ENERGY_FEATURES)
                            return filterEmptyString(srvData.ENERGY_FEATURES).join(", ");
                        else
                            return "N/A";
                    }
                }, EXTERIOR_FEATURES: {
                    name: "Exterior Features", value: () => {
                        if (srvData.EXTERIOR_FEATURES)
                            return filterEmptyString(srvData.EXTERIOR_FEATURES).join(", ");
                        else
                            return "N/A";
                    }
                }, FLOORING: {
                    name: "Flooring", value: () => {
                        if (srvData.FLOORING)
                            return filterEmptyString(srvData.FLOORING).join(", ");
                        else
                            return "N/A";
                    }
                }, EXTERIOR_UNIT_FEATURES: {
                    name: "Exterior Unit Features", value: () => {
                        if (srvData.EXTERIOR_UNIT_FEATURES)
                            return filterEmptyString(srvData.EXTERIOR_UNIT_FEATURES).join(", ");
                        else
                            return "N/A";
                    }
                }, INTEROIR_FEATURES: {
                    name: "Interoir Features", value: () => {
                        if (srvData.INTEROIR_FEATURES)
                            return filterEmptyString(srvData.INTEROIR_FEATURES).join(", ");
                        else
                            return "N/A";

                    }
                }, UTILITIES: {
                    name: "Utilities", value: () => {
                        if (srvData.UTILITIES)
                            return filterEmptyString(srvData.UTILITIES).join(", ");
                        else
                            return "N/A";

                    }
                }, HEATING: {
                    name: "Heating", value: () => {
                        if (srvData.HEATING)
                            return filterEmptyString(srvData.HEATING).join(", ");
                        else
                            return "N/A";

                    }

                }, COOLING: {
                    name: "Cooling", value: () => {
                        if (srvData.COOLING)
                            return filterEmptyString(srvData.COOLING).join(", ");
                        else
                            return "N/A";
                    }

                }, ELECTRIC_FEATURE: {
                    name: "Electric Features", value: () => {
                        if (srvData.ELECTRIC_FEATURE) {
                            return filterEmptyString(srvData.ELECTRIC_FEATURE).join(", ");

                        } else {
                            return "N/A";
                        }
                    }

                }, BASEMENT_FEATURE: {
                    name: "Basement Features", value: () => {
                        if (srvData.BASEMENT_FEATURE)
                            return filterEmptyString(srvData.BASEMENT_FEATURE).join(", ");
                        else
                            return "N/A";

                    }

                }

            }

            const theInfo = filterAndChangeKey(getValues, srvData);
            const theInfoBottom = filterAndChangeKey(getValues2, srvData);
            const theInfoAmen = filterAndChangeKey(getValues3, srvData);

            getForBoxes(theInfo, sideInfo);
            getForBoxes(theInfoBottom, bottomLeftInfo);
            getForBoxes(theInfoAmen, amenInfo);
            //Get the url for all the photos
            for (let i = 0; i < srvData.PHOTO_COUNT; i++) {
                photos.push('https://media.mlspin.com/photo.aspx?mls=' + srvData.LIST_NO + '&n=' + i);
            }
        }
        //Empty the array on page change. If you do not then the array will grow more and more everytime
        return () => { sideInfo = []; bottomLeftInfo = []; amenInfo = [] }
    }, [srvData]);


    if (srvData) {
        if (srvData.UNIT_NO) {
            unitNo = "Unit: " + srvData.UNIT_NO;
        }
    }

    return (

        <div className="propertylist-container">

            <React.Fragment>
                <div className="propertylist-header">

                    <div className="propertylist-header-left">
                        <div className="propertylist-header-left-inner">
                            <div className="propertylist-header-left-inner-top">{isLoaded ? `${srvData.STREET_NO} ${srvData.STREET_NAME} ${unitNo}` : ""}</div>
                            <div className="propertylist-header-left-inner-bottom">{isLoaded ? `${srvData.LONG}, ${srvData.STATE} ${srvData.ZIP_CODE}` : ""}</div>
                        </div>
                    </div>
                    <div className="propertylist-header-right">
                        <div className="propertylist-header-right-inner">
                            <div className="propertylist-header-right-inner-top">{isLoaded ? (srvData.LIST_PRICE).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }) : ""}</div>
                            <div>Price</div>
                        </div>
                        <div className="propertylist-header-right-inner">
                            <div className="propertylist-header-right-inner-top">{isLoaded ? srvData.NO_BEDROOMS : ""}</div>
                            <div>Beds</div>
                        </div>
                        <div className="propertylist-header-right-inner">
                            <div className="propertylist-header-right-inner-top">{isLoaded ? srvData.NO_FULL_BATHS : ""}</div>
                            <div>Bath</div>
                        </div>
                        <div className="propertylist-header-right-inner">

                            <div className="propertylist-header-right-inner-top">{isLoaded ? srvData.NO_HALF_BATHS : ""}</div>
                            <div>Half Baths</div>
                        </div>
                        <div className="propertylist-header-right-inner">

                            <div className="propertylist-header-right-inner-top">{isLoaded ? srvData.SQUARE_FEET : ""}</div>
                            <div>Sq. Ft.</div>
                        </div>
                    </div>
                </div>
                <div className="line-bottom-header"></div>
                <div className="propertylist-top">
                    <div className="propertylist-left">
                        {isLoaded ?
                            <PhotoGallery imgSrc={photos} />
                            :
                            <Skeleton width={"100%"} height={"500px"} variant="rect" />}
                        <span className="propertylist-remark">
                            {isLoaded ? srvData.REMARKS.replace(/,/g, ', ') : <Skeleton width={"100%"} height={"300px"} style={{ marginTop: "100px" }} variant="rect" />}
                        </span>
                        <span className="list-bottom">
                            <h1 style={{ color: "black" }}>{isLoaded ? `Details for ${srvData.STREET_NO} ${srvData.STREET_NAME} ${unitNo}` : ""}</h1>
                            <PropertyInfoBox rowValues={bottomLeftInfo} />
                        </span>

                    </div>
                    <div className="propertylist-right">
                        {isLoaded ?
                            <PropertyInfoBox rowValues={sideInfo} /> :
                            <Skeleton width={"100%"} height={"200px"} variant="rect" />}

                        <div className="propertylist-contact">
                            <ContactManager mlsID={isLoaded ? srvData.LIST_NO : ""} textGhost={isLoaded ? srvData.STREET_NO + " " + srvData.STREET_NAME : ""} />
                        </div>
                    </div>
                </div>

                {isLoaded ?

                    <LocationMapper

                        url={{ googleMaps: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB7RyP9aW7VcYGYrBuRzQ3yqoYT6F--rw8" }}
                        address={`${srvData.STREET_NO} ${srvData.STREET_NAME} ${unitNo}`}
                        title={"Property Location"} />
                    : <></>}


                {isLoaded ?
                    <>
                        {amenInfo.length > 0 ?
                            <div style={{ marginTop: "20px" }} >
                                <h1>Amenities</h1>
                                <div className="customBorder"> </div>  </div> : <></>}
                        <PropertyInfoBox rowValues={amenInfo} />    </> :
                    <></>


                }


                <div style={{ width: "100%", position: "relative", marginTop: "50px" }}>

                    {isLoaded ?
                        <div id="ws-walkscore-tile" ><iframe height="700px" frameBorder="0" scrolling="no" title="Walk Score" width="100%" src={`https://www.walkscore.com/serve-walkscore-tile.php?wsid=ga86370f7de3749bfa2f65f96acb041a0&s=${srvData.STREET_NAME.replace(" ", "-")}-${srvData.LONG.replace(" ", "-")}-${srvData.STATE}-&o=h&c=f&h=700&fh=0&w=600`} ></iframe>

                        </div>
                        : <></>}

                    {isLoaded ?
                        <BillCalculator tax={parseFloat(srvData.TAXES).toFixed(2)} homePrice={parseFloat(srvData.LIST_PRICE).toFixed(2)} hoa={parseFloat(srvData.HOA_FEE).toFixed(2)} /> : <></>}
                </div>
            </React.Fragment>

        </div>
    )
}

export default PropertyInfo;