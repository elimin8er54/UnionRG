import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { loadImages } from "../../helpers";
import { Skeleton } from "@material-ui/lab";

interface Props {
  slideStyle: { imageSrc: string; text: string }[];
}

const SlideShow: React.FC<Props> = (
  props: Props
): React.ReactElement<Props> => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const slideLength = props.slideStyle.length;

  useEffect(() => {
    const imageArray = props.slideStyle.map((element) => {
      return element.imageSrc;
    });

    loadImages(imageArray).then(() => {
      setIsImagesLoaded(true);
    });

    const interval = setInterval(() => {
      if (currentSlide >= slideLength - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, 7000);

    return () => clearInterval(interval);
  });

  //Do a map for the array of objects for each slide

  return (
    <React.Fragment>
      <section className="slider">
        {isImagesLoaded ? (
          props.slideStyle.map((s, i) => (
            <div
              // if active slide, include the "active" class
              className={
                i === currentSlide
                  ? "slide active"
                  : "slide" && i !== currentSlide
                    ? "slide hidden"
                    : "slide"
              }
              // if not active, hide from screen readers for accessibility
              aria-hidden={i !== currentSlide}
            >
              <div className="slide-text">
                <h2 className="asd">
                  <i>{s.text}</i>
                </h2>
              </div>
              {i === currentSlide && (
                <img
                  className="image"
                  src={s.imageSrc}
                  alt={`Image for flair ${s.text}`}
                />
              )}
            </div>
          ))
        ) : (
            <>

            </>
          )}
      </section>
    </React.Fragment>
  );
};

export default SlideShow;
