import React from "react";
import Deal from "./body/Deal";
import Settings from "./body/Settings";
import Agent from "./body/Agent";
import AgentList from "./body/AgentList";
import DealList from "./body/DealList";
import LandlordList from "./body/LandlordList";
import Landlord from "./body/Landlord";
import NotFound from "../body/NotFound";

import { Route, Switch } from "react-router-dom";

const Body = () => {
  return (
    <div className="pages">
      <Switch>
        <Route exact path="/admin/changesite" component={Settings} />
        <Route exact path="/admin/deal/:id?" component={Deal} />
        <Route exact path="/admin/agentlist" component={AgentList} />
        <Route exact path="/admin/agent/:id?" component={Agent} />
        <Route exact path="/admin/deallist/" component={DealList} />
        <Route exact path="/admin/landlordlist/" component={LandlordList} />
        <Route exact path="/admin/landlord/:id?" component={Landlord} />
        <Route exact path="/*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default Body;
