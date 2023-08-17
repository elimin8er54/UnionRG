import React, { useEffect, useRef, useState } from 'react';

const ChartJs = require('chart.js');

type Props = {
    type: string,
    data?: ChartData,
    options?: {},
    total: number
}

type ChartData = {
    labels: string[];
    datasets: ChartDataSet[];
}

type ChartDataSet = {
    label?: string;
    backgroundColor?: string[];
    borderColor?: string;
    data: string[];
}

const Chart = (props: Props) => {

    const canvasRef = useRef();



    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current;
        const chart = new ChartJs(canvas.getContext('2d'), {
            // The type of chart we want to create
            type: props.type,

            // The data for our dataset
            data: props.data || {},

            // Configuration options go here
            options: props.options || {}
        });

    });

    //All this just to also show the text in the center of the circle
    let centerText: any = [<></>];

    for (let i = 0; i < props.data.labels.length; i++) {

        centerText.push(<><span>{`${props.data.labels[i]}: ${props.data.datasets[0].data[i]}`}</span><br /></>);

    }

    return (
        <div style={{ position: "relative" }} >
            <div className="theCenter" >


                {`Monthly: `} <br />
                {`$${props.total}`}


            </div>
            <canvas ref={canvasRef}>




            </canvas>
        </div>

    );

}

export default Chart;