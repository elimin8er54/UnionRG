import React, { useEffect, useState, useMemo } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import DealTabInbound from "./DealTabInbound";
import DealTabOutbound from "./DealTabOutbound";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Helper from "../../../../helpers/helper";

type BalanceLandlord = {
  firstMonth: string;
  lastMonth: string;
  security: string;
  key: string;
  cleaning: string;
};

type BalanceCompany = {
  tenant: string;
  app: string;
  coBroke?: string;
};

type Props = {
  id: string;
  paramUpdater: (theID: string) => void;
  titleUpdate: (theID: string) => void;
  onUpdate: (snack: any) => void;
};

const DealTabBalance = (props: Props) => {
  const [firstMonthFee, setFirstMonthFee] = useState("0");
  const [lastMonthFee, setLastMonthFee] = useState("0");
  const [securityFee, setSecurityFee] = useState("0");
  const [appFee, setAppFee] = useState("0");
  const [tenantFee, setTenantFee] = useState("0");
  const [landlordFee, setLandlordFee] = useState("0");
  const [keyFee, setKeyFee] = useState("0");
  const [cleaningFee, setCleaningFee] = useState("0");
  const [coBrokeFee, setCoBrokeFee] = useState("0");
  const [dealNotes, setDealNotes] = useState("");
  const [firstMonthFeeDate, setFirstMonthFeeDate] = useState(null);
  const [lastMonthFeeDate, setLastMonthFeeDate] = useState(null);
  const [securityFeeDate, setSecurityFeeDate] = useState(null);
  const [appFeeDate, setAppFeeDate] = useState(null);
  const [tenantFeeDate, setTenantFeeDate] = useState(null);
  const [landlordFeeDate, setLandlordFeeDate] = useState(null);
  const [keyFeeDate, setKeyFeeDate] = useState(null);
  const [coBrokeFeeDate, setCoBrokeFeeDate] = useState(null);
  const [cleaningFeeDate, setCleaningFeeDate] = useState(null);
  const [clientRefund, setClientRefund] = useState("");
  const [firstMonthOwes, setFirstMonthFeeOwes] = useState("");
  const [lastMonthOwes, setLastMonthFeeOwes] = useState("");
  const [securityFeeOwes, setSecurityFeeOwes] = useState("");
  const [appFeeOwes, setAppFeeOwes] = useState("");
  const [tenantFeeOwes, setTenantFeeOwes] = useState("");
  const [landlordFeeOwes, setLandlordFeeOwes] = useState("");
  const [keyFeeOwes, setKeyFeeOwes] = useState("");
  const [cleaningFeeOwes, setCleaningFeeOwes] = useState("");
  const [coBrokeFeeOwes, setCoBrokeFeeOwes] = useState("");
  const [submitValidation, setSubmitValidation] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [inboundValues, setInboundValues] = useState({
    First: 0,
    Last: 0,
    Security: 0,
    App: 0,
    Tenant: 0,
    Landlord: 0,
    Cleaning: 0,
    Key: 0,
  });

  const [firstColor, setFirstColor] = useState("#ffffff");
  const [lastMonthColor, setLastMonthColor] = useState("white");
  const [securityColor, setSecurityColor] = useState("white");
  const [appColor, setAppColor] = useState("white");
  const [tenantColor, setTenantColor] = useState("white");
  const [landlordColor, setLandlordColor] = useState("white");
  const [keyColor, setKeyColor] = useState("white");
  const [cleaningColor, setCleaningColor] = useState("white");
  useEffect(() => {

    if (submitValidation) {
      updateValues([
        { inboundPurpose: "First", inboundAmount: inboundValues.First },
        { inboundPurpose: "Last", inboundAmount: inboundValues.Last },
        { inboundPurpose: "Security", inboundAmount: inboundValues.Security },
        { inboundPurpose: "App", inboundAmount: inboundValues.App },
        { inboundPurpose: "Tenant", inboundAmount: inboundValues.Tenant },
        { inboundPurpose: "Landlord", inboundAmount: inboundValues.Landlord },
        { inboundPurpose: "Cleaning", inboundAmount: inboundValues.Cleaning },
        { inboundPurpose: "Key", inboundAmount: inboundValues.Key },
      ]);

      setSubmitValidation(false);
    }
    if (!initialLoad) {
      handleGetDeal(props.id);

    }
  }, [submitValidation]);

  const handleFirstMonthFeeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstMonthFee(event.target.value as string);
    handleSubmit(event.target.value as string, "FirstMonthFee");
    setSubmitValidation(true);
  };
  const handleLastMonthFeeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLastMonthFee(event.target.value as string);
    handleSubmit(event.target.value as string, "LastMonthFee");
    setSubmitValidation(true);
  };
  const handleSecurityFeeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecurityFee(event.target.value as string);
    handleSubmit(event.target.value as string, "SecurityFee");
    setSubmitValidation(true);
  };
  const handleAppFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppFee(event.target.value as string);
    handleSubmit(event.target.value as string, "AppFee");
    setSubmitValidation(true);
  };
  const handleTenantFeeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTenantFee(event.target.value as string);
    handleSubmit(event.target.value as string, "TenatFee");
    setSubmitValidation(true);
  };
  const handleLandlordFeeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLandlordFee(event.target.value as string);
    handleSubmit(event.target.value as string, "LandlordFee");
    setSubmitValidation(true);
  };
  const handleKeyFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyFee(event.target.value as string);
    handleSubmit(event.target.value as string, "KeyFee");
    setSubmitValidation(true);
  };
  const handleCleaningFeeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCleaningFee(event.target.value as string);
    handleSubmit(event.target.value as string, "CleaningFee");
    setSubmitValidation(true);
  };
  const handleCoBrokeFeeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCoBrokeFee(event.target.value as string);
    handleSubmit(event.target.value as string, "CoBrokeFee");
  };
  const handleDealNotesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDealNotes(event.target.value as string);
    handleSubmit(event.target.value as string, "DealNotes");
  };
  const handleFirstMonthFeeDateChange = (date: Date | null) => {
    setFirstMonthFeeDate(date);
    handleSubmit(date, "FirstMonthFeeDate");
  };
  const handleLastMonthFeeDateChange = (date: Date | null) => {
    setLastMonthFeeDate(date);
    handleSubmit(date, "LastMonthFeeDate");
  };
  const handleSecurityFeeDateChange = (date: Date | null) => {
    setSecurityFeeDate(date);
    handleSubmit(date, "SecurityFeeDate");
  };
  const handleAppFeeDateChange = (date: Date | null) => {
    setAppFeeDate(date);
    handleSubmit(date, "AppFeeDate");
  };
  const handleTenantFeeDateChange = (date: Date | null) => {
    setTenantFeeDate(date);
    handleSubmit(date, "TenatFeeDate");
  };
  const handleLandlordFeeDateChange = (date: Date | null) => {
    setLandlordFeeDate(date);
    handleSubmit(date, "LandlordFeeDate");
  };
  const handleKeyFeeDateChange = (date: Date | null) => {
    setKeyFeeDate(date);
    handleSubmit(date, "KeyFeeDate");
  };
  const handleCoBrokeFeeDateChange = (date: Date | null) => {
    setCoBrokeFeeDate(date);
    handleSubmit(date, "CoBrokeFeeDate");
  };

  const handleCleaningFeeDateChange = (date: Date | null) => {
    setCleaningFeeDate(date);
    handleSubmit(date, "CleaningFeeDate");
  };

  const handleSubmit = (value: any, valueType: string) => {
    const data = {
      value: value,
      valueType: valueType,
      dealID: props.id,
    };

    fetch("/api/updatedealbalance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          props.onUpdate({ message: "Updated!", type: "success" });
        } else {
          props.onUpdate({ message: "Error", type: "error" });
        }
      });
  };

  const handleGetDeal = (theID: string) => {
    const data = {
      dealID: theID || "",
    };

    fetch("/api/getonedeal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          const theValues = data.values[0];

          props.titleUpdate(
            Helper.getDealID(
              theValues.dealCreatedDate,
              data.theUser[0].initial,
              theValues.dealCount,
              theValues.isCoBroke
            )
          );
          setFirstMonthFee(theValues.firstMonthFee);
          setLastMonthFee(theValues.lastMonthFee);
          setSecurityFee(theValues.securityFee);
          setAppFee(theValues.appFee);
          setTenantFee(theValues.tenantFee);
          setLandlordFee(theValues.landlordFee);
          setKeyFee(theValues.keyFee);
          setCleaningFee(theValues.cleaningFee);
          setCoBrokeFee(theValues.coBrokeFee);
          setDealNotes(theValues.dealNotes);

          setFirstMonthFeeDate(theValues.firstMonthFeeDate || null);
          setLastMonthFeeDate(theValues.lastMonthFeeDate || null);
          setSecurityFeeDate(theValues.securityFeeDate || null);
          setAppFeeDate(theValues.appFeeDate || null);
          setTenantFeeDate(theValues.tenantFeeDate || null);
          setLandlordFeeDate(theValues.landlordFeeDate || null);
          setKeyFeeDate(theValues.keyFeeDate || null);
          setCleaningFeeDate(theValues.cleaningFeeDate || null);
          setCoBrokeFeeDate(theValues.coBrokeFeeDate || null);

          setInitialLoad(true);
          //Call this to make the initial colors appear for balancing
          setSubmitValidation(true);
        } else {
          //clearBox();
        }
      });
  };

  const obj = {
    firstMonth: firstMonthFee,
    lastMonth: lastMonthFee,
    security: securityFee,
    cleaning: cleaningFee,
    key: keyFee,
  };

  const obj2 = {
    tenant: tenantFee,
    app: appFee,
  };

  const handleLeasePdf = () => {
    const data = {
      dealID: "123"
    };

    fetch("/api/pdflease", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        responseType: "blobs"
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.blob()
      })
      .then((data) => {
        const fileURL = URL.createObjectURL(data);
        window.open(fileURL);
      });
  }

  const getClientOwesLandlord = (theVals: BalanceLandlord) => {
    const owed =
      parseFloat(theVals.firstMonth) +
      parseFloat(theVals.lastMonth) +
      parseFloat(theVals.key) +
      parseFloat(theVals.security) +
      parseFloat(theVals.cleaning);
    return owed;
  };

  const getClientOwesCompany = (theVals: BalanceCompany) => {
    const owed = parseFloat(theVals.tenant) + parseFloat(theVals.app);

    return owed;
  };

  const checkIfBalanced = (total: number, payed: number) => {
    if (payed === undefined || Number.isNaN(payed)) {
      payed = 0;
    }

    let result = false;
    if (total - payed <= 0) {
      result = true;
    }

    return result;
  };
  let clientOwesLandlord = useMemo(() => getClientOwesLandlord(obj), [obj]);
  let clientOwesCompany = useMemo(() => getClientOwesCompany(obj2), [obj2]);
  let clientOwesTotal =
    clientOwesLandlord + clientOwesCompany + parseFloat(landlordFee);
  let theRefund = parseFloat(clientRefund);
  let landlordOwes = parseFloat(landlordFee);
  if (Number.isNaN(clientOwesTotal)) {
    clientOwesTotal = 0;
  }
  if (Number.isNaN(clientOwesLandlord)) {
    clientOwesLandlord = 0;
  }
  if (Number.isNaN(clientOwesCompany)) {
    clientOwesCompany = 0;
  }
  if (Number.isNaN(landlordOwes)) {
    landlordOwes = 0;
  }
  if (Number.isNaN(theRefund)) {
    theRefund = 0;
  }
  const updateValues = (inboundInfo: any) => {
    //Dont want any preloading of incorrect values
    if (firstMonthFee === "" && inboundInfo.length <= 0) {
      return;
    }

    const result: any = {};

    inboundInfo.forEach((element: any) => {
      if (result[element.inboundPurpose]) {
        result[element.inboundPurpose] += parseFloat(element.inboundAmount);
      } else {
        result[element.inboundPurpose] = parseFloat(element.inboundAmount);
      }
    });

    setInboundValues({
      First: result.First,
      Last: result.Last,
      Security: result.Security,
      App: result.App,
      Tenant: result.Tenant,
      Landlord: result.Landlord,
      Key: result.Key,
      Cleaning: result.Cleaning,
    });
    if (result) {
      if (checkIfBalanced(parseFloat(firstMonthFee), result.First)) {
        setFirstColor("#ccff90");
      } else {
        setFirstColor("#d50000");
      }
      if (checkIfBalanced(parseFloat(lastMonthFee), result.Last)) {
        setLastMonthColor("#ccff90");
      } else {
        setLastMonthColor("#d50000");
      }
      if (checkIfBalanced(parseFloat(securityFee), result.Security)) {
        setSecurityColor("#ccff90");
      } else {
        setSecurityColor("#d50000");
      }
      if (checkIfBalanced(parseFloat(appFee), result.App)) {
        setAppColor("#ccff90");
      } else {
        setAppColor("#d50000");
      }
      if (checkIfBalanced(parseFloat(tenantFee), result.Tenant)) {
        setTenantColor("#ccff90");
      } else {
        setTenantColor("#d50000");
      }
      if (checkIfBalanced(parseFloat(landlordFee), result.Landlord)) {

        setLandlordColor("#ccff90");
      } else {
        setLandlordColor("#d50000");
      }
      if (checkIfBalanced(parseFloat(keyFee), result.Key)) {
        setKeyColor("#ccff90");
      } else {
        setKeyColor("#d50000");
      }
      if (checkIfBalanced(parseFloat(cleaningFee), result.Cleaning)) {
        setCleaningColor("#ccff90");
      } else {
        setCleaningColor("#d50000");
      }
      if (result.First) {
        setFirstMonthFeeOwes(
          (parseFloat(firstMonthFee) - result.First).toFixed(2)
        );
      } else {
        setFirstMonthFeeOwes(firstMonthFee);
      }
      if (result.Last) {
        setLastMonthFeeOwes(
          (parseFloat(lastMonthFee) - result.Last).toFixed(2)
        );
      } else {
        setLastMonthFeeOwes(lastMonthFee);
      }
      if (result.Security) {
        setSecurityFeeOwes(
          (parseFloat(securityFee) - result.Security).toFixed(2)
        );
      } else {
        setSecurityFeeOwes(securityFee);
      }
      if (result.App) {
        setAppFeeOwes((parseFloat(appFee) - result.App).toFixed(2));
      } else {
        setAppFeeOwes(appFee);
      }
      if (result.Tenant) {
        setTenantFeeOwes((parseFloat(tenantFee) - result.Tenant).toFixed(2));
      } else {
        setTenantFeeOwes(tenantFee);
      }
      if (result.Landlord) {
        setLandlordFeeOwes(
          (parseFloat(landlordFee) - result.Landlord).toFixed(2)
        );
      } else {
        setLandlordFeeOwes(landlordFee);
      }
      if (result.Key) {
        setKeyFeeOwes((parseFloat(keyFee) - result.Key).toFixed(2));
      } else {
        setKeyFeeOwes(keyFee);
      }
      if (result.Cleaning) {
        setCleaningFeeOwes(
          (parseFloat(cleaningFee) - result.Cleaning).toFixed(2)
        );
      } else {
        setCleaningFeeOwes(cleaningFee);
      }
    }
  };

  const setOwed = (snack: any, inboundInfo: any) => {
    updateValues(inboundInfo);
  };

  const setClientOutbound = (snack: any, outboundInfo: any) => {
    const result: any = {}
    outboundInfo.forEach((element: any) => {
      if (result[element.inboundPurpose]) {
        result[element.inboundPurpose] += parseFloat(element.inboundAmount);
      } else {
        result[element.inboundPurpose] = parseFloat(element.inboundAmount);
      }
    });

    setClientRefund(result['Client Refund']);
  };


  const money = {
    firstMonth: parseFloat(firstMonthFee),
    lastMonth: parseFloat(lastMonthFee),
    security: parseFloat(securityFee),
    cleaning: parseFloat(cleaningFee),
    key: parseFloat(keyFee),
    landlord: parseFloat(landlordFee),
    tenant: parseFloat(tenantFee),
    app: parseFloat(appFee),
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {initialLoad ? (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Balance</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel htmlFor="">First Month</InputLabel>
                    <Input
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={firstMonthFee}
                      onChange={handleFirstMonthFeeChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl>
                    <InputLabel></InputLabel>
                    <Input
                      color="primary"
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={firstMonthOwes}
                    />
                    <div
                      style={{
                        backgroundColor: firstColor,
                        width: "100%",
                        height: "5px",
                      }}
                    ></div>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption">
                    <KeyboardDatePicker

                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      emptyLabel=""
                      value={firstMonthFeeDate}
                      onChange={handleFirstMonthFeeDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <FormControl>
                    <InputLabel htmlFor="">Client to Landlord</InputLabel>
                    <Input
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={clientOwesLandlord.toFixed(2)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel htmlFor="">Last Month</InputLabel>
                    <Input
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={lastMonthFee}
                      onChange={handleLastMonthFeeChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl>
                    <InputLabel></InputLabel>
                    <Input
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={lastMonthOwes}
                    />
                  </FormControl>
                  <div
                    style={{
                      backgroundColor: lastMonthColor,
                      width: "100%",
                      height: "5px",
                    }}
                  ></div>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption">
                    <KeyboardDatePicker

                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      value={lastMonthFeeDate}
                      onChange={handleLastMonthFeeDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <FormControl>
                    <InputLabel htmlFor="">Client to Union</InputLabel>
                    <Input
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={clientOwesCompany.toFixed(2)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel htmlFor="">Security Fee</InputLabel>

                    <Input
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={securityFee}
                      onChange={handleSecurityFeeChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl>
                    <InputLabel></InputLabel>
                    <Input
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={securityFeeOwes}
                    />
                  </FormControl>
                  <div
                    style={{
                      backgroundColor: securityColor,
                      width: "100%",
                      height: "5px",
                    }}
                  ></div>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption">
                    <KeyboardDatePicker

                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      value={securityFeeDate}
                      onChange={handleSecurityFeeDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <FormControl>
                    <InputLabel htmlFor="">Landlord to Union</InputLabel>
                    <Input
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={landlordOwes.toFixed(2)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel htmlFor="">App Fee</InputLabel>
                    <Input
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={appFee}
                      onChange={handleAppFeeChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl>
                    <InputLabel></InputLabel>
                    <Input
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={appFeeOwes}
                    />
                  </FormControl>
                  <div
                    style={{
                      backgroundColor: appColor,
                      width: "100%",
                      height: "5px",
                    }}
                  ></div>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption">
                    <KeyboardDatePicker

                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      value={appFeeDate}
                      onChange={handleAppFeeDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <FormControl>
                    <InputLabel htmlFor="">Total Owed</InputLabel>
                    <Input
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={clientOwesTotal.toFixed(2)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel htmlFor="">Tenant Fee</InputLabel>
                    <Input
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={tenantFee}
                      onChange={handleTenantFeeChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl>
                    <InputLabel></InputLabel>
                    <Input
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={tenantFeeOwes}
                    />
                  </FormControl>
                  <div
                    style={{
                      backgroundColor: tenantColor,
                      width: "100%",
                      height: "5px",
                    }}
                  ></div>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption">
                    <KeyboardDatePicker

                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      value={tenantFeeDate}
                      onChange={handleTenantFeeDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  {theRefund > 0 ?
                    <FormControl>
                      <InputLabel htmlFor="">Client Refund</InputLabel>
                      <Input
                        disabled
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        value={theRefund.toFixed(2)}
                      />
                    </FormControl> : <></>}
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel htmlFor="">Landlord Fee</InputLabel>
                    <Input
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={landlordFee}
                      onChange={handleLandlordFeeChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl>
                    <InputLabel></InputLabel>
                    <Input
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={landlordFeeOwes}
                    />
                  </FormControl>
                  <div
                    style={{
                      backgroundColor: landlordColor,
                      width: "100%",
                      height: "5px",
                    }}
                  ></div>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption">
                    <KeyboardDatePicker

                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      value={landlordFeeDate}
                      onChange={handleLandlordFeeDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel htmlFor="">Key Fee</InputLabel>
                    <Input
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={keyFee}
                      onChange={handleKeyFeeChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl>
                    <InputLabel></InputLabel>
                    <Input
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={keyFeeOwes}
                    />
                  </FormControl>
                  <div
                    style={{
                      backgroundColor: keyColor,
                      width: "100%",
                      height: "5px",
                    }}
                  ></div>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption">
                    <KeyboardDatePicker

                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      value={keyFeeDate}
                      onChange={handleKeyFeeDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel htmlFor="">Cleaning Fee</InputLabel>
                    <Input
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={cleaningFee}
                      onChange={handleCleaningFeeChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl>
                    <InputLabel></InputLabel>
                    <Input
                      disabled
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={cleaningFeeOwes}
                    />
                  </FormControl>
                  <div
                    style={{
                      backgroundColor: cleaningColor,
                      width: "100%",
                      height: "5px",
                    }}
                  ></div>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption">
                    <KeyboardDatePicker

                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      value={cleaningFeeDate}
                      onChange={handleCleaningFeeDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel htmlFor="">Co-Broke Fee</InputLabel>
                    <Input
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value={coBrokeFee}
                      onChange={handleCoBrokeFeeChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption">
                    <KeyboardDatePicker

                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      value={coBrokeFeeDate}
                      onChange={handleCoBrokeFeeDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Inbound </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {initialLoad ? (
                <DealTabInbound
                  onUpdate={setOwed}
                  money={money}
                  id={props.id}
                />
              ) : (
                <></>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>OutBound</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {initialLoad ? (
                <DealTabOutbound onUpdate={setClientOutbound} money={money} id={props.id} />
              ) : (
                <></>
              )}
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Notes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                onChange={handleDealNotesChange}
                label="Deal Notes."
                multiline
                rows={5}
                style={{ width: "100%" }}
                value={dealNotes}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Forms</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={1}>
                  <Button onClick={handleLeasePdf} variant="contained" component="label">
                    asd
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button variant="contained" component="label">
                    asd
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button variant="contained" component="label">
                    asd
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button variant="contained" component="label">
                    asd
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </>
      ) : (
        <></>
      )}
    </MuiPickersUtilsProvider>
  );
};

export default DealTabBalance;
