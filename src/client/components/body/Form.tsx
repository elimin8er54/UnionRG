import React, { useEffect, useState } from "react";
import "../../App.css";
import SlideShow from "../reused/SlideShow";
import Helper from "../../helpers/helper";
import { Skeleton } from "@material-ui/lab";

const Form = () => {
  const [slides, setSlides] = useState([{ imageSrc: "#", text: "" }]);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  useEffect(() => {
    Helper.getAllSlides("5", (values: any) => {
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

      <div className="forms">
        <a
          target="_blank"
          href="https://signnow.com/s/yQ67gymH"
          className="union-button"
        >
          <span>Rental Application</span>
        </a>
        <a
          target="_blank"
          href="https://signnow.com/s/m0akpwV7"
          className="union-button"
        >
          <span>Guarantor Form</span>
        </a>
        <a
          target="_blank"
          href="https://signnow.com/s/CO4P3y7W"
          className="union-button"
        >
          <span>Deposit Form</span>
        </a>
      </div>
    </React.Fragment>
  );
};

export default Form;
