import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DealTabClient from "./DealTabs/DealTabClient";
import DealTabLandlord from "./DealTabs/DealTabLandlord";
import DealTabBalance from "./DealTabs/DealTabBalance";
import Helper from "../../../helpers/helper";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
type Props = {
  children: React.ReactChild;
  value: number;
  index: number;
};

//casting for snackbar

type Color = "info" | "error" | "success";
type Params = {
  id: string;
};
const Deal = (props: Props) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <>{children}</>}
    </div>
  );
};



export default function SimpleTabs(props: any) {
  const [value, setValue] = useState(0);
  const params: Params = useParams();
  const [param, setParam] = useState(params.id);
  const [title, setTitle] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState({ type: "info", message: "info" });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  let pageTitle = "Create Deal";

  if (param) {
    pageTitle = title;
  }

  const handleSnackClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const paramUpdater = (theID: string) => {
    props.history.push(theID);
    setParam(theID);
  };

  const titleUpdater = (theID: string) => {
    setParam(theID);
  };

  let asd = [];
  if (param) {
    asd.push(<Tab key="1" label="Landlord" />, <Tab key="2" label="Balance" />);
  }


  const handleSnack = (snackStatus: any) => {
    setOpenSnack(true);

    setSnack(snackStatus);
  }

  return (
    <>
      <div style={{ marginBottom: "100px" }} className={`about`}>
        <AppBar style={{ backgroundColor: "#1976d2" }} position="static">
          <Tabs value={value} onChange={handleChange} aria-label="Deal Ticket">
            <Tab key="3" label="Clients" />
            {...asd}

            <Typography
              style={{ flexGrow: 1, float: "right", color: "inherit" }}
              variant="h6"
            >
              {pageTitle}
            </Typography>
          </Tabs>
        </AppBar>
        <Deal value={value} index={0}>
          <DealTabClient
            onUpdate={handleSnack}
            titleUpdate={(val) => {
              setTitle(val);
            }}
            paramUpdater={paramUpdater}
            id={param}
          />
        </Deal>
        <Deal value={value} index={1}>
          <DealTabLandlord
            onUpdate={handleSnack}
            titleUpdate={(val) => {
              setTitle(val);
            }}
            paramUpdater={paramUpdater}
            id={param}
          />
        </Deal>
        <Deal value={value} index={2}>
          <DealTabBalance
            onUpdate={handleSnack}
            titleUpdate={(val) => {
              setTitle(val);
            }}
            paramUpdater={paramUpdater}
            id={param}
          />
        </Deal>
      </div>
      <Snackbar
        open={openSnack}
        autoHideDuration={1000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity={snack.type as Color}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
