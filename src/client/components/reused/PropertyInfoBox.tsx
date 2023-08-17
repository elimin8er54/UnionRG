import React, { useState, useEffect } from 'react';

type Props = {
    rowValues: { key: string, value: unknown }[];
}

const PropertyInfoBox = (props: Props) => {

    const theList = props.rowValues.map((result) => {
        return <div className="info-row">
            <div className="left">{result.key}:</div>
            <div className="right"><strong>{result.value}</strong>
            </div>
        </div>


    });

    return (
        <div className="key-info-block">
            {theList}
        </div>
    )

}

export default PropertyInfoBox;