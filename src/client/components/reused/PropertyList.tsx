
import React, { useEffect, useState, useRef } from 'react';
import { postRequest } from '../../helpers/main';
import PropertyPreview from "./PropertyPreview";

import CircularProgress from '@material-ui/core/CircularProgress';

const PropertyList = (props: any) => {
    const [srvData, setSrvData] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [prevParams, setPrevParams] = useState(null);

    const params = new URLSearchParams(props.search);

    let urls = {
        bedroom: params.get("bedroom"),
        bathroom: params.get("bathroom"),
        location: params.get("location") || 'Newton',
        minprice: params.get("minprice"),
        maxprice: params.get("maxprice"),
        bathroomhalf: params.get("bathroomhalf"),
        type: params.get("type"),
        currentpage: props.currentPage - 1
    };

    useEffect(() => {

        //This is getting the Search Params from the url to send to the server

        //Only update if no data, page changed, or parameters in url changed
        if (!srvData || prevPage != props.currentPage || props.search !== prevParams) {

            setPrevParams(props.search);
            setIsLoaded(false);
            setPrevPage(props.currentPage);
            postRequest("/mls/getproperties", urls).then((data) => {

                //Un comment this if you want to force waiting for all images to load first

                /*   const theUrls = data.values.map((val: any) => {
                       return 'https://media.mlspin.com/photo.aspx?mls=' + val.LIST_NO + '&n=0';
                   });
   
                    loadImages(theUrls).then(() => {*/
                setSrvData(data.values.map((val: any) => {
                    return <PropertyPreview

                        key={val.LIST_NO}
                        width={"200px"}
                        height={"250px"}
                        srcUrl={
                            ['https://media.mlspin.com/photo.aspx?mls=' + val.LIST_NO + '&n=0']
                        }

                        bed={val.NO_BEDROOMS}
                        bath={val.NO_FULL_BATHS}
                        unit={val.UNIT_NO}
                        address={val.STREET_NO + " " + val.STREET_NAME}
                        addressBottom={val.LONG + " " + val.STATE + ", " + val.ZIP_CODE}
                        sqft={val.SQUARE_FEET}
                        propertyID={val.LIST_NO}
                        price={(val.LIST_PRICE).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })}

                    />
                }));
                if (props.totalPages)
                    props.totalPages(data.total);
                // });
            });
        } else {
            setIsLoaded(true);
        }
    }, [srvData, props.currentPage, props.search]);


    return (<>
        <p>Photos hosted by mlspin.com. Image display speed may vary based on mlspin server load.</p>
        {isLoaded ?
            (srvData)
            : <div><CircularProgress /></div>}
        <p>Disclaimer: The property listing data and information set forth herein were provided to MLS Property Information Network, Inc. from third party sources, including sellers, lessors and public records, and were compiled by MLS Property Information Network, Inc. The property listing data and information are for the personal, non-commercial use of consumers having a good faith interest in purchasing or leasing listed properties of the type displayed to them and may not be used for any purpose other than to identify prospective properties which such consumers may have a good faith interest in purchasing or leasing. MLS Property Information Network, Inc. and its subscribers disclaim any and all representations and warranties as to the accuracy of the property listing data and information set forth herein.</p>
    </>);

}

export default PropertyList;