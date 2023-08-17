import React, { useEffect, useState, useMemo } from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import RemoveIcon from "@material-ui/icons/Remove";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export type Money = {
  firstMonth: number;
  lastMonth: number;
  security: number;
  cleaning: number;
  key: number;
  landlord: number;
  tenant: number;
  app: number;
};

type Props = {
  deleteInbound: (clientName: string) => void;
  inboundPurpose: string;
  inboundAmount: string;
  inboundDate: Date;
  inboundPayor: string;
  inboundPayorInfo: { name: string; id: string; type: string }[];
  inboundPayorType: string;
  inboundMethod: string;
  inboundCheck: string;
  inboundNotes: string;
  getInboundInfo: ({}: any) => void;
  id: string;
  money: Money;
  isNew: boolean;
};

const DealTabInboundSummary = (props: Props) => {
  const [inboundPurpose, setInboundPurpose] = useState(
    props.inboundPurpose || "First"
  );
  const [inboundAmount, setInboundAmount] = useState(props.inboundAmount);
  const [inboundDate, setInboundDate] = useState(props.inboundDate || null);
  const [inboundPayor, setInboundPayor] = useState("");
  const [inboundPayorType, setInboundPayorType] = useState(
    props.inboundPayorType
  );
  const [inboundMethod, setInboundMethod] = useState(
    props.inboundMethod || "Bankers"
  );
  const [inboundCheck, setInboundCheck] = useState(props.inboundCheck);
  const [inBoundNotes, setInboundNotes] = useState(props.inboundNotes);
  const [submitValidation, setSubmitValidation] = useState(false);

  //This is so we wait till the next rerender before getting the state lifted
  //We do this so we dont have to make a bunch of event.target.value splits with state splits

  useEffect(() => {
    let obj = props.getInboundInfo({
      inboundPurpose: inboundPurpose,
      inboundAmount: inboundAmount,
      inboundDate: inboundDate,
      inboundPayor: inboundPayor,
      inboundPayorType: inboundPayorType,
      inboundMethod: inboundMethod,
      inboundCheck: inboundCheck,
      inBoundNotes: inBoundNotes,
      id: props.id,
      isNew: props.isNew,
    });

    if (submitValidation) {
      obj;

      setSubmitValidation(false);
    }
  }, [submitValidation]);

  const handleInboundPurposeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInboundPurpose(event.target.value as string);
    amountSetter(event.target.value as string);
    setSubmitValidation(true);
  };

  const handeInboundAmountChangee = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setInboundAmount(event.target.value as string);
    setSubmitValidation(true);
  };

  const handleInboundDateChange = (date: Date | null) => {
    setInboundDate(date);
    setSubmitValidation(true);
  };
  const handleIboundPayorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInboundPayor(event.target.value as string);

    setInboundPayorType(event.currentTarget.getAttribute("data-type"));
    setSubmitValidation(true);
  };

  const handleInboundMethodChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setInboundMethod(event.target.value as string);
    setSubmitValidation(true);
  };

  const handleInboundCheckChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setInboundCheck(event.target.value as string);
    setSubmitValidation(true);
  };
  const handleInboundNotesChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setInboundNotes(event.target.value as string);
    setSubmitValidation(true);
  };

  const deleteClientHandler = (event: React.MouseEvent<{ value: unknown }>) => {
    props.deleteInbound(props.id);
  };

  const mapper = (theInfo: any) => {
    return theInfo.map((element: any) => {
      return (
        <MenuItem
          key={element._id}
          value={element._id}
          data-type={element.type}
        >
          {element.name}
        </MenuItem>
      );
    });
  };

  //Memo: Only update when the landlordInfo has changed. Just incase the list gets too big we dont want to render all teh time
  const menuItems = useMemo(() => mapper(props.inboundPayorInfo), [
    props.inboundPayorInfo,
  ]);

  const amountSetter = (type: string) => {
    if (type === "First") {
      setInboundAmount(props.money.firstMonth.toFixed(2));
    } else if (type === "Last") {
      setInboundAmount(props.money.lastMonth.toFixed(2));
    } else if (type === "Security") {
      setInboundAmount(props.money.security.toFixed(2));
    } else if (type === "Tenant") {
      setInboundAmount(props.money.tenant.toFixed(2));
    } else if (type === "Landlord") {
      setInboundAmount(props.money.landlord.toFixed(2));
    } else if (type === "Key") {
      setInboundAmount(props.money.key.toFixed(2));
    } else if (type === "Cleaning") {
      setInboundAmount(props.money.cleaning.toFixed(2));
    } else if (type === "Application") {
      setInboundAmount(props.money.app.toFixed(2));
    }
  };

  return (
    <>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel>Purpose</InputLabel>
          <Select
            value={inboundPurpose}
            label="Purpose"
            onChange={handleInboundPurposeChange}
          >
            <MenuItem value={"First"}>First Month</MenuItem>
            <MenuItem value={"Last"}>Last Month</MenuItem>
            <MenuItem value={"Security"}>Security Fee</MenuItem>
            <MenuItem value={"Tenant"}>Tenant Fee</MenuItem>
            <MenuItem value={"Landlord"}>Landlord Fee</MenuItem>
            <MenuItem value={"Key"}>Key Fee</MenuItem>
            <MenuItem value={"Cleaning"}>Cleaning Fee</MenuItem>
            <MenuItem value={"Credit"}>3 %Credit Fee</MenuItem>
            <MenuItem value={"Application"}>Application Fee</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="caption">
          <TextField
            fullWidth
            value={inboundAmount}
            onChange={handeInboundAmountChangee}
            label="Amount"
          />
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <KeyboardDatePicker
          fullWidth
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          value={inboundDate}
          onChange={handleInboundDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <FormControl fullWidth>
          <InputLabel>Payor</InputLabel>
          <Select
            value={inboundPayor}
            label="Select Payor"
            onChange={handleIboundPayorChange}
          >
            {menuItems}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <FormControl fullWidth>
          <InputLabel>Method</InputLabel>
          <Select
            value={inboundMethod}
            label="Method of Payment"
            onChange={handleInboundMethodChange}
          >
            <MenuItem value={"Bankers"}>Bankers Check</MenuItem>
            <MenuItem value={"Cash"}>Cash</MenuItem>
            <MenuItem value={"Credit Card"}>Credit Card</MenuItem>
            <MenuItem value={"Money Order"}>Money Order</MenuItem>
            <MenuItem value={"Personal Check"}>Personal Check</MenuItem>
            <MenuItem value={"Wire"}>Wire</MenuItem>
            <MenuItem value={"LL Deduct"}>LL Deduct</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="caption">
          <TextField
            fullWidth
            value={inboundCheck}
            onChange={handleInboundCheckChange}
            label="Check #"
          />
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography variant="caption">
          <TextField
            fullWidth
            value={inBoundNotes}
            onChange={handleInboundNotesChange}
            label="Notes"
          />
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Delete Client">
          <Fab
            size="small"
            style={{ zIndex: 100 }}
            color="primary"
            aria-label="delete"
            onClick={deleteClientHandler}
          >
            <RemoveIcon />
          </Fab>
        </Tooltip>
      </Grid>
    </>
  );
};

export default DealTabInboundSummary;
