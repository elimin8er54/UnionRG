import React, { useEffect, useState } from "react";
import "../../App.css";
import SlideShow from "../reused/SlideShow";
import SearchBar, { Tab } from "../reused/SearchBar";
import ContactManager from "../reused/ContactManager";
import Helper from "../../helpers/helper";
import { Skeleton } from "@material-ui/lab";

const Leasing = () => {
  const [slides, setSlides] = useState([{ imageSrc: "#", text: "" }]);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  useEffect(() => {
    Helper.getAllSlides("2", (values: any) => {
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

  return (
    <React.Fragment>
      <div className="slideshow-wrapper">
        {isImgLoaded ? <SlideShow slideStyle={slides} /> : <></>}
      </div>

      <div className="leasing">
        <h1 className="mini-title">LEASING</h1>
        <p>
          Union Realty Group is dedicated to helping you find your next
          apartment, walk you through the application process and ensure a
          smooth transition on move-in date. Whether you are a seasoned renter,
          a college student or someone who is relocating to the Massachusetts
          area, our team of experts are here to help you every step of the way.
        </p>

        <ContactManager textGhost={"Type your message here..."} />
      </div>
    </React.Fragment>
  );
};

export default Leasing;
