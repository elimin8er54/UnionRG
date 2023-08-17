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
  inboundCheck: string;
  inboundNotes: string;
  getInboundInfo: ({ }: any) => void;
  id: string;
  money: Money;
  isNew: boolean;
};

const DealTabOutboundSummary = (props: Props) => {
  const [inboundPurpose, setInboundPurpose] = useState(
    props.inboundPurpose || "First"
  );
  const [inboundAmount, setInboundAmount] = useState(props.inboundAmount);
  const [inboundPayor, setInboundPayor] = useState("");

  const [inboundCheck, setInboundCheck] = useState(props.inboundCheck);
  const [inboundNotes, setInboundNotes] = useState(props.inboundNotes);
  const [submitValidation, setSubmitValidation] = useState(false);

  //This is so we wait till the next rerender before getting the state lifted
  //We do this so we dont have to make a bunch of event.target.value splits with state splits

  useEffect(() => {
    let obj = props.getInboundInfo({
      inboundPurpose: inboundPurpose,
      inboundAmount: inboundAmount,
      inboundPayor: inboundPayor,
      inboundCheck: inboundCheck,
      inboundNotes: inboundNotes,
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
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel>Purpose</InputLabel>
          <Select
            value={inboundPurpose}
            label="Purpose"
            onChange={handleInboundPurposeChange}
          >
            <MenuItem value={"Client Refund"}>Client Refund</MenuItem>
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
      <Grid item xs={3}>
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
        <Typography variant="caption">
          <TextField
            fullWidth
            value={inboundCheck}
            onChange={handleInboundCheckChange}
            label="Check #"
          />
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="caption">
          <TextField
            fullWidth
            value={inboundNotes}
            onChange={handleInboundNotesChange}
            label="Notes"
          />
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Delete Outbound">
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

export default DealTabOutboundSummary;
