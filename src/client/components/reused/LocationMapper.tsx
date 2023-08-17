// @ts-nocheck

//Google map typedefs broken
import React, { useEffect } from 'react';

type Props = {
    address: string,
    url: { googleMaps: string },
    title: string
}

const LocationMapper = (props: Props) => {

    const loadScript = (url: string) => new Promise((resolve) => {
        //Don't create another map script tag if one exists.
        if (!document.getElementById('map-script')) {
            const tag = document.createElement('script');
            tag.async = false;
            tag.src = url;
            tag.id = "map-script";
            const body = document.body;
            body.appendChild(tag);
            tag.addEventListener('load', resolve, {
                once: true
            });
        } else {
            //if it already exists then there is no issue. Resolve it!
            resolve();

        }
    });

    useEffect(() => {
        Promise.all(Object.values(props.url).map(loadScript))
            .then(setMap);
    }, [props.url]);

    function setMap() {

        const map = new google.maps.Map(document.getElementById('map'), {

            zoom: 16
        });
        const geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, map);
    }

    const geocodeAddress = (
        geocoder: google.maps.Geocoder,
        resultsMap: google.maps.Map
    ) => {
        const address = props.address;
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                resultsMap.setCenter(results[0].geometry.location);
                new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                });
            }
        });
    }

    return (
        <div id="map" className="map-mapper"></div>
    );

}

export default LocationMapper;

