import React, { useState, useEffect, useRef } from 'react';
import { loadImage } from "../../helpers";
import { Skeleton } from "@material-ui/lab";
// @ts-ignore
//Splide has no type defs
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
type Props = {
    imgSrc: string[];
}



//Convert this to functional at some point. Not a big deal since this code was just copy and pasted anyways
const PhotoGallery = (props: Props) => {

    const primaryRef = useRef(null);
    const secondaryRef = useRef(null);
    useEffect(() => {

        primaryRef.current.sync(secondaryRef.current.splide);

    }, [])

    function renderSlides() {
        //Just make the slideshow look nicer before fully
        if (props.imgSrc.length !== 0) {
            return props.imgSrc.map((slide: any) => {
                return <SplideSlide key={slide}>
                    <img className="slide-image" alt="Property Photo" style={{ width: "100%" }} src={slide} />
                </SplideSlide>
            })
        } else {
            return <Skeleton className="slide-image" height={"500px"} variant="rect" />
        }
    };



    const primaryOptions = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: '1rem',
        pagination: false,
    };

    const secondaryOptions = {
        type: 'slide',
        rewind: true,
        gap: '.5rem',
        pagination: false,
        fixedWidth: 110,
        fixedHeight: 70,
        cover: true,
        focus: 'center',
        isNavigation: true,
        updateOnMove: true,
    };



    return (
        <div className="wrapper">
            <Splide className="top-slider" options={primaryOptions} ref={primaryRef}>
                {renderSlides()}
            </Splide>

            <Splide options={secondaryOptions} ref={secondaryRef}>
                {props.imgSrc.length !== 0 ?
                    renderSlides()
                    : <div style={{ marginTop: "50px" }}></div>}
            </Splide>

        </div >

    )
}

export default PhotoGallery;