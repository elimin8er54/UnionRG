import React, { useState } from "react";
import { Skeleton } from "@material-ui/lab";
type Props = {
  [key: string]: string | React.ReactElement;
  imageSrc: string;
  text?: React.ReactElement;
  width: string;
  height: string;
  agentName: string;
  phone: string;
  email: string;
  occupation: string;
};

const Agents: React.FC<Props> = (props: Props): React.ReactElement<Props> => {
  const [isBioShowing, setIsBioShowing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [flipped, setFlipped] = useState(false);

  let classNames;
  let photo;
  if (isBioShowing) {
    classNames = "fadeIn";
    photo = "fadeOut";
  } else {
    classNames = "fadeOut";
    photo = "fadeIn";
  }

  const flipIt = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFlipped(true);
  };

  const unFlipIt = () => {
    setFlipped(false);
  };

  return (
    <React.Fragment>
      <div onMouseLeave={unFlipIt} className="agent-container">
        <div className={`indi-container ${flipped ? " flip-it" : ""}`}>
          <div className="flip-card-front">
            <div className={"image-cropper"}>
              <img
                className={"agent-image"}
                alt="Photo of an agent that works here."
                style={isLoaded ? {} : { display: "none" }}
                onLoad={() => setIsLoaded(true)}
                src={props.imageSrc}
              />
              {isLoaded ? (
                <div></div>
              ) : (
                <Skeleton variant="rect" height={250} />
              )}
            </div>
            <div className="agent-name">{props.agentName}</div>

            <button
              style={{
                visibility: flipped || !props.text ? "hidden" : "visible",
              }}
              onClick={flipIt}
              className="searchbar-button searchbar-search"
            >
              About Me
            </button>
            <span className="agent-bottom-text">
              <div className="agent-oc">{props.occupation}</div>

              <div className="agent-email">{props.email}</div>
              <div className="agent-phone">{props.phone}</div>
            </span>
          </div>
          <div className="flip-card-back">
            <p
              className="back-text"
              style={{ float: "left", whiteSpace: "pre-line" }}
            >
              {props.text}
            </p>
          </div>
        </div>

        <span
          className={classNames}
          style={{ position: "absolute", left: "0" }}
        ></span>
      </div>
    </React.Fragment>
  );
};

export default Agents;
