import React, { useEffect, useState } from "react";
import "../../App.css";
import SlideShow from "../reused/SlideShow";
import ContactManager from "../reused/ContactManager";
import Helper from "../../helpers/helper";


const PropertyManagement = () => {
  const [slides, setSlides] = useState([{ imageSrc: "#", text: "" }]);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  useEffect(() => {
    Helper.getAllSlides("3", (values: any) => {
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
        <h1 className="mini-title">PROPERTY MANAGEMENT</h1>

        <p>
          Union Realty Group offers a full service property management service
          through our sister company Brownstone Management. Brownstone is a new
          alternative to traditional property management. Not only do we have
          top notch maintenance and established contractor relationships, we
          could handle all maintenance, emergencies, rent collections, security
          deposits, renovation/development, and tenant issue resolution with
          excellence. Brownstone Management has an innovative process that
          streamlines property management and rental service into one powerful
          program. No matter if you are a real estate investor or an out of town
          property owner that needs someone to properly look after your
          investment, Brownstone Management will tailor our services to fit your
          needs.
        </p>

        <ContactManager textGhost={"Type your message here..."} />
      </div>
    </React.Fragment>
  );
};

export default PropertyManagement;
