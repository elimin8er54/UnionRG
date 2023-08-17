import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
interface Props {
  [key: string]: string | JSX.Element | boolean;
  width: string;
  height: string;
  srcUrl: string;
  hrefUrl: string;
  text: JSX.Element;
  external?: boolean;
}

const FeaturedListingPhotos: React.FC<Props> = (
  props: Props
): React.ReactElement<Props> => {
  let to;
  if (props.external) {
    to = "#";
  } else {
    to = props.hrefUrl;
  }

  const divStyle = {
    height: props.height,
  };
  return (
    <>
      <div className="fl-container" >
        <NavLink onClick={() => {
          if (props.external) {
            window.open(
              props.hrefUrl,
              '_blank' // <- This is what makes it open in a new window.
            );
          }
        }} to={to}>
          <div className="fl-photo-container" style={divStyle}>
            <img
              alt="Alternative navigation photo" className="fl-photo2" src={props.srcUrl} />
          </div>
        </NavLink>
        <div className="fl-text">
          <span>{props.text}</span>
        </div>
      </div>

    </>
  );
};

export default FeaturedListingPhotos;
