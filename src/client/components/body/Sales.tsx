import React, { useEffect, useState } from "react";
import "../../App.css";
import SlideShow from "../reused/SlideShow";
import SearchBar, { Tab } from "../reused/SearchBar";
import PropertyList from "../reused/PropertyList";
import Helper from "../../helpers/helper";
import { Skeleton } from "@material-ui/lab";
const Sales = (props: any) => {
  const [slides, setSlides] = useState([{ imageSrc: "#", text: "" }]);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  useEffect(() => {
    Helper.getAllSlides("1", (values: any) => {
      setSlides(
        values.map((element: any) => {
          return {
            imageSrc: Helper.getHttpProto() + values[0].imgPath + element.src,
            text: "",
          };
        })
      );
      setIsImgLoaded(true);
    });
  }, []);

  const search = props.location.search;
  return (
    <React.Fragment>
      <div className="slideshow-wrapper">
        {isImgLoaded ? <SlideShow slideStyle={slides} /> : <></>}
      </div>

      <div className="sales">
        <h1 className="mini-title">SALES</h1>
        <p>
          Union Realty Group is devoted to helping you buy your next house with
          confidence. Whether you are a seasoned investor or a first time home
          buyer, our team of experts are here to help you every step of the way.
          Union Realty Group’s goal is to optimize the sales process of your
          home from estimating the value using comparative market analysis, to
          preparing the listing to be viewed by potential buyers, to presenting
          purchase offers for your consideration.
        </p>
      </div>
      <div className="leasing-bottom">
        <SearchBar default={Tab.BUY} buttons={[]} />
        <div className="featured">
          <span>
            <PropertyList search={search} />
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sales;
