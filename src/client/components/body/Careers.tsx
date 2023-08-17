import React, { useEffect, useState } from "react";
import "../../App.css";
import SlideShow from "../reused/SlideShow";
import ContactManager from "../reused/ContactManager";
import Helper from "../../helpers/helper";
import { Skeleton } from "@material-ui/lab";

const PropertyManagement = () => {
  const [slides, setSlides] = useState([{ imageSrc: "#", text: "" }]);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  useEffect(() => {
    Helper.getAllSlides("4", (values: any) => {
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

      <div className="propertymanagement">
        <h1 className="mini-title">Careers</h1>

        <p>
          Union Realty Group offers competitive Residential/Commercial Leasing &
          Sales commision splits. Whether you are an experienced agent that
          seeks autonomy or you are a hungry new agent looking for experience
          and guidance, Union Realty Group will consider those with drive,
          commitment, and passion for the real estate and the industry.
        </p>

        <ContactManager
          customSubject="Carrer"
          textGhost={"(Optional) Send us a message..."}
        />
      </div>
    </React.Fragment>
  );
};

export default PropertyManagement;
