import React from "react";
import Header from "./Header";
import Body from "./Body";
import { BrowserRouter as Router } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Body />
        </div>
      </Router>
    </div>
  );
};

export default Main;
