import React from "react";
import "../../App.css";

const Landing = () => {
  return (
    <React.Fragment>
      <div style={{ width: "50%", textAlign: "center" }} className="home">
        <img alt="Union realty group logo"
          className="header-logo"
          src={require("../../../../public/images/logo.png")}
        />
        <p> Website Under Construction.</p>
      </div>

    </React.Fragment>
  );
};

export default Landing;
