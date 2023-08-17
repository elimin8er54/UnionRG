import React from 'react';
import About from "./body/About";
import Home from "./body/Home";
import Sales from "./body/Sales";
import Contact from "./body/Contact";
import Leasing from "./body/Leasing";
import Properties from "./body/Properties";
import Form from "./body/Form";
import Careers from "./body/Careers";
import NotFound from "./body/NotFound";
import PropertyInfo from "./body/PropertyInfo";

import PropertyManagement from "./body/PropertyManagement";
import { Route, Switch } from "react-router-dom";

const Body = () => {

  return (

    <div className="pages">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route
          exact
          path="/leasing"
          component={Leasing}
        />
        <Route
          exact
          path="/sales"
          component={Sales}
        />

        <Route
          exact
          path="/propertymanagement"
          component={PropertyManagement}
        />
        <Route
          exact
          path="/contact"
          component={Contact}
        />
        <Route
          exact
          path="/forms"
          component={Form}
        />
        <Route
          exact
          path="/propertyinfo/:propertyID"
          component={PropertyInfo}

        />
        <Route
          exact
          path="/properties"
          component={Properties}
        />
        <Route
          exact
          path="/careers"
          component={Careers}
        />

        <Route
          exact
          path="/*"
          component={NotFound}
        />
      </Switch>

    </div>

  );


}

export default Body;