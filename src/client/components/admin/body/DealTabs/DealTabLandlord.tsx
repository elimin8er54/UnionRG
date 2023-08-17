import React, { useEffect, useState, useMemo } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Helper from "../../../../helpers/helper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LandlordHandler, { Status } from "../../../reused/LandlordHandler";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import LandlordList from "../LandlordList";

type Props = {
  id: string;
  paramUpdater: (theID: string) => void;
  titleUpdate: (theID: string) => void;
  onUpdate: (snack: any) => void;
};

const DealTabLandlord = (props: Props) => {
  const [leaseStreetAddress, setLeaseStreetAddress] = useState("");
  const [leaseCity, setLeaseCity] = useState("");
  const [leaseUnitNumber, setLeaseUnitNumber] = useState("");
  const [leaseZipCode, setLeaseZipCode] = useState("");

  const [maintenanceName, setMaintenanceName] = useState("");
  const [maintenancePhone, setMaintenancePhone] = useState("");
  const [maintenanceAddress, setMaintenanceAddress] = useState("");
  const [maintenanceCsz, setMaintenanceCsz] = useState("");
  const [agentName, setAgentName] = useState("");
  const [addendum, setAddendum] = useState("");
  const [w9, setW9] = useState("");
  const [type, setType] = useState("Lease");
  const [bedrooms, setBedrooms] = useState("Studio");
  const [moveInDate, setMoveInDate] = useState(null);
  const [leaseExpDate, setLeaseExpDate] = useState(null);
  const [days, setDays] = useState("");
  const [monthlyInstallments, setMonthlyInstallments] = useState("");
  const [installmentDueOn, setInstallmentDueOn] = useState("");
  const [isCobroke, setIsCobroke] = useState("");
  const [isLandlordEditHidden, setIsLandlordEditHidden] = useState(true);
  const [landlordInfo, setLandlordInfo] = useState([]);
  const [selectedLandlord, setSelectedLandlord] = useState("");
  const [checkPayable, setCheckPayable] = useState("");
  const [leaseState, setLeaseState] = useState("");
  const [open, setOpen] = useState(false);
  const [months, setMonths] = useState("");
  const [total, setTotal] = useState("");
  const [dealCount, setDealCount] = useState(null);

  const [parkingOption, setParkingOption] = useState(
    "1 parking spot included in the rent"
  );
  const [parkingAmount, setParkingAmount] = useState("");
  const [parkingDetail, setParkingDetail] = useState("");
  const [utilitiesOption, seUtilitiesOption] = useState(
    "Heat and hot water included"
  );
  const [utilitiesDetail, setUtilitiesDetail] = useState("");
  const [otherText, setOtherText] = useState("");
  const [petOptions, setPetOptions] = useState("1 cat is allowed");
  const [petDetail, setPetDetail] = useState("");

  const [status, setStatus] = useState(Status.Update);

  const [isInitialLoad, setIsinitialLoad] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    if (isInitialLoad) {
      handleGetLandlords();
      handleGetDeal(props.id);
      setIsinitialLoad(false);
    }

    if (isLoaded) {

      updateCalc(moveInDate, leaseExpDate, monthlyInstallments, days);
      //Set to false so it only gets called once
      // setIsLoaded(false);
    }

    if (selectedLandlord.length > 0) {
      setIsLandlordEditHidden(false);
    }
  }, [selectedLandlord, isLoaded, days]);

  const handleLeaseStreetAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLeaseStreetAddress(event.target.value as string);
    handleSubmit(event.target.value as string, "LeaseStreetAddress");
  };

  const handleLeaseCityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLeaseCity(event.target.value as string);
    handleSubmit(event.target.value as string, "LeaseCity");
  };

  const handleLeaseUnitNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLeaseUnitNumber(event.target.value as string);
    handleSubmit(event.target.value as string, "LeaseUnitNumber");
  };

  const handleLeaseZipCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLeaseZipCode(event.target.value as string);
    handleSubmit(event.target.value as string, "LeaseZipCode");
  };

  const handleMaintenanceNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaintenanceName(event.target.value as string);
    handleSubmit(event.target.value as string, "MaintenanceName");
  };

  const handleMaintenancePhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaintenancePhone(event.target.value as string);
    handleSubmit(event.target.value as string, "MaintenancePhone");
  };

  const handleMaintenanceAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaintenanceAddress(event.target.value as string);
    handleSubmit(event.target.value as string, "MaintenanceAddress");
  };

  const handleMaintenaanceCszChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaintenanceCsz(event.target.value as string);
    handleSubmit(event.target.value as string, "MaintenanceCsz");
  };

  const handleAgentNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAgentName(event.target.value as string);
    handleSubmit(event.target.value as string, "AgentName");
  };

  const handleDealCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let theVal = event.target.value;
    if (Number.isNaN(theVal) || theVal === "") theVal = "0"
    setDealCount(parseInt(theVal, 10) as number);
    handleSubmit(theVal as string, "DealCount");
  };

  const handleAddendumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddendum(event.target.value as string);
    handleSubmit(event.target.value as string, "Addendum");
  };
  const handleW9Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setW9(event.target.value as string);
    handleSubmit(event.target.value as string, "W9");
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value as string);
    handleSubmit(event.target.value as string, "Type");
  };

  const handleBedroomsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBedrooms(event.target.value as string);
    handleSubmit(event.target.value as string, "Bedrooms");
  };

  const handleMoveInDateChange = (date: Date | null) => {
    let date2 = new Date(date.valueOf());
    date2.setDate(date.getDate() + 364);
    setMoveInDate(date);
    handleSubmit(date, "MoveInDate");
    handleSubmit(date2, "LeaseExpDate");
    setLeaseExpDate(date2);
    updateCalc(date, date2, monthlyInstallments, days);
  };

  const handleLeaseExpDateChange = (date: Date | null) => {
    setLeaseExpDate(date);
    handleSubmit(date, "LeaseExpDate");
    updateCalc(moveInDate, date, monthlyInstallments, days);
  };

  const handleMonthlyInstallmentsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMonthlyInstallments(event.target.value as string);
    handleSubmit(event.target.value as string, "MonthyInstallment");
    updateCalc(moveInDate, leaseExpDate, event.target.value, days);
  };

  const handleDayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = event.target.value;
    if ((parseInt(val, 10) <= 29 && parseInt(val, 10) >= 0) || val === "") {
      setDays(val as string);
      handleSubmit(val as string, "Days");
      updateCalc(moveInDate, leaseExpDate, monthlyInstallments, val as string);
    }
  };

  const handleInstallmentDueOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInstallmentDueOn(event.target.value as string);
    handleSubmit(event.target.value as string, "InstallmentDueOn");
  };

  const handleCheckPayableChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckPayable(event.target.value as string);
    handleSubmit(event.target.value as string, "CheckPayable");
  };

  const handleLeaseStateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLeaseState(event.target.value as string);
    handleSubmit(event.target.value as string, "LeaseState");
  };

  const handleIsCobrokeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsCobroke(event.target.value as string);
    handleSubmit(event.target.value as string, "IsCoBroke");
  };

  const handleSelectedLandlordChange = (value: any) => {
    setSelectedLandlord(value);

    handleSubmit(value, "LandlordID");

    setIsLandlordEditHidden(false);
  };

  const handleParkingOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParkingOption(event.target.value as string);
  };

  const handleParkingAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParkingAmount(event.target.value as string);
  };

  const handleParkingDetailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParkingDetail(event.target.value as string);
    handleSubmit(event.target.value as string, "ParkingDetail");
  };

  const handleUtilitiesOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    seUtilitiesOption(event.target.value as string);
  };

  const handleUtilitiesDetaiiChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUtilitiesDetail(event.target.value as string);
    handleSubmit(event.target.value as string, "UtilitiesDetail");
  };

  const handleOtherTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherText(event.target.value as string);
    handleSubmit(event.target.value as string, "OtherDetail");
  };

  const handlePetOptionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPetOptions(event.target.value as string);
  };

  const handlePetDetailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPetDetail(event.target.value as string);
    handleSubmit(event.target.value as string, "PetDetail");
  };

  const handleParkingButtonClick = () => {
    let theVal = parkingOption;

    if (parkingOption === "Other") {
      theVal = `One parking spot included for an extra $${parkingAmount} per month`;
    }

    let newState = parkingDetail + " " + theVal;

    setParkingDetail(newState);
    handleSubmit(newState as string, "ParkingDetail");
  };

  const handleUtilButtonClick = () => {
    let newState = utilitiesDetail + " " + utilitiesOption;
    setUtilitiesDetail(newState);
    handleSubmit(newState as string, "UtilitiesDetail");
  };

  const handlePetButtonClick = () => {
    let newState = petDetail + " " + petOptions;

    setPetDetail(newState);
    handleSubmit(newState as string, "PetDetail");
  };

  let theLandlord = { csz: "", name: "", address: "", phone: "" };
  if (selectedLandlord) {
    theLandlord = landlordInfo.find((element: any) => {
      return element._id === selectedLandlord;
    });
  }

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
        setIsLoaded(true);
        if (data.success) {
          const theValues = data.values[0];
          props.titleUpdate(
            Helper.getDealID(
              theValues.dealCreatedDate,
              data.theUser[0].initial,
              theValues.dealCount,
              theValues.isCoBroke,
            )


          );

          setLeaseState(theValues.leaseState || "");
          setCheckPayable(theValues.checkPayable || "");
          setLeaseStreetAddress(theValues.leaseStreetAddress || "");
          setLeaseCity(theValues.leaseCity || "");
          setLeaseUnitNumber(theValues.leaseUnitNumber || "");
          setLeaseZipCode(theValues.leaseZipCode || "");
          setMaintenanceName(theValues.maintenanceName || "");
          setMaintenancePhone(theValues.maintenancePhone || "");
          setMaintenanceAddress(theValues.maintenanceAddress || "");
          setMaintenanceCsz(theValues.maintenanceCsz || "");
          setAgentName(theValues.dealAgentName || "");
          setAddendum(theValues.addendum || "");
          setW9(theValues.w9 || "");
          setType(theValues.dealType || "");
          setBedrooms(theValues.bedrooms || "");
          setMoveInDate(theValues.moveInDate || null);
          setLeaseExpDate(theValues.leaseExpDate || null);
          setMonthlyInstallments(theValues.monthyInstallment || "");
          setInstallmentDueOn(theValues.installmentDueOn || "");
          setIsCobroke(theValues.isCoBroke || "");
          setParkingDetail(theValues.parkingDetail || "");
          setUtilitiesDetail(theValues.utilitiesDetail || "");
          setOtherText(theValues.otherDetail || "");
          setPetDetail(theValues.petDetail || "");
          setSelectedLandlord(theValues.landlordID || "");
          setDays(theValues.days || "");
          setDealCount(parseInt(theValues.dealCount, 10) + 1 || null);

        } else {
          //clearBox();
        }
      });
  };

  const handleSubmit = (value: any, valueType: string) => {
    const data = {
      value: value,
      valueType: valueType,
      dealID: props.id,
    };

    fetch("/api/updatedeallandlord", {
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

  const handleGetLandlords = () => {
    const data = {};

    fetch("/api/getlandlords", {
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
          const theValues = data.values;
          setLandlordInfo(theValues);
        }
      });
  };

  const handleSubmitLandlordInfo = (values: any) => {
    setOpen(false);
    handleGetLandlords();
  };



  const updateCalc = (
    moveInDate: Date,
    leaseExpDate: Date,
    monthlyInstallments: string,
    days: string
  ) => {
    if (moveInDate === null || leaseExpDate === null) {
      return;
    }
    const [a, c] = Helper.handleCalculate(
      moveInDate,
      leaseExpDate,
      monthlyInstallments,
      days

    );

    setMonths(a.toString());
    setTotal(c.toFixed(2));
  };

  const handleCopyLandlord = () => {
    setCheckPayable(theLandlord.name || "");
    setMaintenanceName(theLandlord.name || "");
    setMaintenancePhone(theLandlord.phone || "");
    setMaintenanceAddress(theLandlord.address || "");
    setMaintenanceCsz(theLandlord.csz || "");
    //If we dont check for empty the database will give a 0 updated result
    //Which would then cause an error popup to occur even though it should not

    if (theLandlord.name !== "" && theLandlord.name !== maintenanceName) {
      handleSubmit(theLandlord.name as string, "MaintenanceName");
    }
    if (theLandlord.name !== "" && theLandlord.name !== checkPayable) {
      handleSubmit(theLandlord.name as string, "CheckPayable");
    }
    if (theLandlord.phone !== "" && theLandlord.phone !== maintenancePhone)
      handleSubmit(theLandlord.phone as string, "MaintenancePhone");
    if (
      theLandlord.address !== "" &&
      theLandlord.address !== maintenanceAddress
    )
      handleSubmit(theLandlord.address as string, "MaintenanceAddress");
    if (theLandlord.csz !== "" && theLandlord.csz !== maintenanceCsz)
      handleSubmit(theLandlord.csz as string, "MaintenanceCsz");
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {isLoaded ? (
        <>
          <LandlordHandler
            status={status}
            onSubmit={handleSubmitLandlordInfo}
            landlordID={selectedLandlord}
            onClose={() => {
              setOpen(false);
            }}
            isOpen={open}
          />
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Address and apartment #</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12} >
                  <TextField
                    fullWidth
                    value={leaseStreetAddress}
                    onChange={handleLeaseStreetAddressChange}
                    label="Lease Address"
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <TextField
                    fullWidth
                    value={leaseUnitNumber}
                    onChange={handleLeaseUnitNumberChange}
                    label="Unit Number"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    fullWidth
                    value={leaseCity}
                    onChange={handleLeaseCityChange}
                    label="Lease City"
                  />
                </Grid>

                <Grid item md={1} xs={12} >
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select

                      value={leaseState}
                      onChange={handleLeaseStateChange}
                    >
                      <MenuItem value={""}></MenuItem>
                      <MenuItem value={"MA"}>MA</MenuItem>

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={2} xs={12}>
                  <TextField
                    fullWidth
                    value={leaseZipCode}
                    onChange={handleLeaseZipCodeChange}
                    label="Lease Zip Code"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Landlord contact/lease info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    disabled
                    value={theLandlord.name}
                    label="Landlord Name"
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    disabled
                    value={theLandlord.phone}
                    label="Landlord Phone"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    disabled
                    value={theLandlord.address}
                    label="Landlord Address"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    disabled
                    value={theLandlord.csz}
                    label="Landlord CSZ"
                  />
                </Grid>

                <Grid item xs={4}>
                  <Autocomplete
                    options={landlordInfo}
                    defaultValue=""
                    getOptionLabel={(option: any) => option.name}
                    value={selectedLandlord}
                    getOptionSelected={(option, value) => {
                      return option._id === value;
                    }}
                    onChange={(event: any, newValue: any | null) => {
                      handleSelectedLandlordChange(newValue._id);
                    }}
                    disableClearable
                    renderInput={(params) => (
                      <TextField {...params} margin="normal" />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => {
                      setStatus(Status.Insert);
                      setOpen(true);
                    }}
                    variant="contained"
                    component="label"
                    color="primary"
                  >
                    Create New Landord
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    disabled={isLandlordEditHidden}
                    onClick={() => {
                      setStatus(Status.Update);
                      setOpen(true);
                    }}
                    variant="contained"
                    component="label"
                    color="primary"
                  >
                    Edit Chosen Landlord
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Check Payable</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    value={checkPayable}
                    onChange={handleCheckPayableChange}
                    label="Check Payable"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    value={maintenanceName}
                    onChange={handleMaintenanceNameChange}
                    label="Maint. Name"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    value={maintenancePhone}
                    onChange={handleMaintenancePhoneChange}
                    label="Maint. Phone"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={maintenanceAddress}
                    onChange={handleMaintenanceAddressChange}
                    label="Maintenance Address"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={maintenanceCsz}
                    onChange={handleMaintenaanceCszChange}
                    label="Maintenance CSZ"
                  />
                </Grid>

                <Grid item xs={3}>
                  <Button
                    disabled={isLandlordEditHidden}
                    onClick={handleCopyLandlord}
                    variant="contained"
                    component="label"
                    color="primary"
                  >
                    Copy Landlord Info
                  </Button>
                </Grid>
                <Grid item xs={9}></Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Agent</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={3}>
                <TextField
                  value={agentName}
                  onChange={handleAgentNameChange}
                  label="Agent Name"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  value={dealCount}
                  onChange={handleDealCountChange}
                  label="Deal Count"
                /></Grid>
              <Grid item xs={6}></Grid>
            </AccordionDetails>
          </Accordion>


          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Does Landlord have addendum</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <InputLabel>Addendum</InputLabel>
                <Select
                  style={{ width: "200px" }}
                  value={addendum}
                  onChange={handleAddendumChange}
                >
                  <MenuItem value={"No"}>No</MenuItem>
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>W9</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <InputLabel>W9</InputLabel>
                <Select
                  style={{ width: "200px" }}
                  value={w9}
                  onChange={handleW9Change}
                >
                  <MenuItem value={"No"}>No</MenuItem>
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Type</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                  style={{ width: "200px" }}
                  value={type}
                  onChange={handleTypeChange}
                >
                  <MenuItem value={"Lease"}>Lease</MenuItem>
                  <MenuItem value={"Sales"}>Sales</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Occupancy</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={1}>
                  <FormControl>
                    <Select
                      style={{ width: "200px" }}
                      value={bedrooms}
                      onChange={handleBedroomsChange}
                    >
                      <MenuItem value={"Studio"}>Studio</MenuItem>
                      <MenuItem value={"1"}>1 Bed</MenuItem>
                      <MenuItem value={"2"}>2 Bed</MenuItem>
                      <MenuItem value={"3"}>3 Bed</MenuItem>
                      <MenuItem value={"4"}>4 Bed</MenuItem>
                      <MenuItem value={"5"}>5 Bed</MenuItem>
                      <MenuItem value={"6"}>6 Bed</MenuItem>
                      <MenuItem value={"7"}>7 Bed</MenuItem>
                      <MenuItem value={"8"}>8 Bed</MenuItem>
                      <MenuItem value={"9"}>9 Bed</MenuItem>
                      <MenuItem value={"10"}>10 Bed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={11}></Grid>
                <Grid item xs={3}>
                  <KeyboardDatePicker
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Move In Date"
                    value={moveInDate}
                    onChange={handleMoveInDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item xs={9}></Grid>
                <Grid item xs={3}>
                  <KeyboardDatePicker
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Lease Exp. Date"
                    value={leaseExpDate}
                    onChange={handleLeaseExpDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item xs={9}></Grid>
                <Grid item xs={2}>
                  <TextField disabled value={months} label="Months" />
                </Grid>
                <Grid item xs={2}>
                  <TextField value={days}
                    onChange={handleDayChange} label="Prorated Days" />
                </Grid>
                <Grid item xs={2}>
                  <TextField disabled value={total} label="Total" />
                </Grid>

                <Grid item xs={6}></Grid>
                <Grid item xs={2}>
                  <TextField
                    value={monthlyInstallments}
                    onChange={handleMonthlyInstallmentsChange}
                    label="Monthly Install"
                  />
                </Grid>
                <Grid item xs={10}></Grid>

                <Grid item xs={2}>
                  <TextField
                    value={installmentDueOn}
                    onChange={handleInstallmentDueOnChange}
                    label="Installment Due"
                  />
                </Grid>
                <Grid item xs={10}></Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Co-Broke</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <InputLabel>Is Co-Broke?</InputLabel>
                <Select
                  style={{ width: "200px" }}
                  value={isCobroke}
                  onChange={handleIsCobrokeChange}
                >
                  <MenuItem value={"No"}>Not Co-Broke</MenuItem>
                  <MenuItem value={"Yes"}>Is Co-Broke</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Parking</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container justify="flex-end" spacing={3}>
                <Grid item xs={2}>
                  <FormControl>
                    <Select
                      value={parkingOption}
                      onChange={handleParkingOptionChange}
                    >
                      <MenuItem value={"1 parking spot included in the rent"}>
                        1 parking spot included in the rent
                      </MenuItem>

                      <MenuItem value={"2 parking spots included in the rent"}>
                        2 parking spots included in the rent
                      </MenuItem>
                      <MenuItem value={"3 parking spots included in the rent"}>
                        3 parking spots included in the rent
                      </MenuItem>
                      <MenuItem value={"4 parking spots included in the rent"}>
                        4 parking spots included in the rent
                      </MenuItem>
                      <MenuItem value={"5 parking spots included in the rent"}>
                        5 parking spots included in the rent
                      </MenuItem>
                      <MenuItem value={"Other"}>
                        One parking space is included for an extra $_______ per
                        month
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    onClick={handleParkingButtonClick}
                    variant="contained"
                    component="label"
                    color="primary"
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                  <div>
                    <TextField
                      value={parkingAmount}
                      onChange={handleParkingAmountChange}
                      label="Amount"
                    />
                  </div>
                </Grid>
                <Grid item xs={10}></Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={parkingDetail}
                    onChange={handleParkingDetailChange}
                    label="Detail"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Utilities</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container justify="flex-end" spacing={3}>
                <Grid item xs={2}>
                  <FormControl>
                    <Select
                      value={utilitiesOption}
                      onChange={handleUtilitiesOptionChange}
                    >
                      <MenuItem value={"Heat and hot water included"}>
                        Heat and hot water included
                      </MenuItem>
                      <MenuItem value={"Hot water included"}>
                        Hot water included
                      </MenuItem>
                      <MenuItem value={"Heat included"}>Heat included</MenuItem>
                      <MenuItem value={"Electricity included"}>
                        Electricity included
                      </MenuItem>
                      <MenuItem value={"All utilities included"}>
                        All utilities included
                      </MenuItem>
                      <MenuItem value={"No utilities included"}>
                        No utilities included
                      </MenuItem>
                      <MenuItem value={"Cooking gas included"}>
                        Cooking gas included
                      </MenuItem>
                      <MenuItem value={"Cable/internet included"}>
                        Cable/internet included
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={handleUtilButtonClick}
                    variant="contained"
                    component="label"
                    color="primary"
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={utilitiesDetail}
                    onChange={handleUtilitiesDetaiiChange}
                    label="Details"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Other things worth noting</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                onChange={handleOtherTextChange}
                multiline
                rows={5}
                style={{ width: "100%" }}
                value={otherText}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Pets</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container justify="flex-end" spacing={3}>
                <Grid item xs={2}>
                  <FormControl>
                    <Select
                      value={petOptions}
                      onChange={handlePetOptionsChange}
                    >
                      <MenuItem value={"1 cat is allowed"}>1 cat is allowed</MenuItem>
                      <MenuItem value={"1 dog is allowed"}>1 dog is allowed</MenuItem>
                      <MenuItem value={"dogs are allowed"}>dogs are allowed</MenuItem>
                      <MenuItem value={"cats are allowed"}>cats are allowed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={handlePetButtonClick}
                    variant="contained"
                    component="label"
                    color="primary"
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={petDetail}
                    onChange={handlePetDetailChange}
                    label="Details"
                  />
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

export default DealTabLandlord;
