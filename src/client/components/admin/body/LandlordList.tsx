import React, { useEffect, useState } from "react";
import LandlordSummary from "../../reused/LandlordSummary";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: "bottom",
      height: 20,
      width: 20,
    },
    details: {
      alignItems: "center",
    },
    column: {
      flexBasis: "33.33%",
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  })
);

type SearchType = {
  searchName: string;
  searchPhone: string;
  searchLocation: string;
};

const LandlordList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [allLandlords, setAllLandlords] = useState(null);
  const [deleteID, setDeleteID] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [csz, setCsz] = useState("");
  const [updateID, setUpdateID] = useState("None");
  const [snackbarAlert, setSnackbarAlert] = useState(
    <Alert severity="success"></Alert>
  );
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchPhone, setSearchPhone] = useState("");


  useEffect(() => {
    handleGetLandlords();
  }, []);

  function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSearchNameChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSearchName(event.target.value as string);
  };
  const handleSearchLocationChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSearchLocation(event.target.value as string);
  };
  const handleSearchPhoneChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSearchPhone(event.target.value as string);
  };

  const handleSearchReset = (event: React.MouseEvent<{ value: unknown }>) => {
    setSearchPhone("");
    setSearchLocation("");
    setSearchName("");
    handleGetLandlords();
  };

  const handleSearchSubmit = (event: React.MouseEvent<{ value: unknown }>) => {
    handleGetLandlords({
      searchLocation: searchLocation,
      searchName: searchName,
      searchPhone: searchPhone,
    });
  };

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  };
  const handlePhoneChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPhone(event.target.value as string);
  };
  const handleAddressChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setAddress(event.target.value as string);
  };
  const handleCszChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCsz(event.target.value as string);
  };

  const handleDeleteLandlord = () => {
    const data = {
      id: deleteID,
    };

    fetch("/api/deletelandlord", {
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
          setOpenDelete(false);
          handleGetLandlords();
        } else {
        }
      });
  };

  const handleGetLandlords = (search?: SearchType) => {
    const data = {
      isRemoved: false,
      search,
    };

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
          setIsLoaded(true);

          setAllLandlords(
            data.values.map((element: any) => {
              return (
                <LandlordSummary
                  key={element._id}
                  landlordName={element.name}
                  landlordID={element._id}
                  landlordPhone={element.phone}
                  landlordAddress={element.address}
                  landlordCsz={element.csz}
                  handleDeleteLandlord={handleOpenDelete}
                  handleEditClick={handleEditClick}
                />
              );
            })
          );
        }
      });
  };

  const handleEditClick = (theID: string) => {
    setOpen(true);
    handleGetLandlord(theID);
  };

  const handleSubmit = () => {
    const data = {
      address: address,
      csz: csz,
      phone: phone,
      name: name,
      id: updateID || "None",
    };

    fetch("/api/updatelandlordfull", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        setSnackOpen(true);
        if (!response.ok) {
          setSnackbarAlert(
            <Alert severity="error">An unknown error occured!</Alert>
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setSnackbarAlert(
            <Alert severity="success">Update was a success!</Alert>
          );
          handleGetLandlords();
        } else {
          setSnackbarAlert(<Alert severity="error">Error Occured!</Alert>);
        }
      });
  };

  const handleGetLandlord = (theID: string) => {
    const data = {
      id: theID || "",
    };

    fetch("/api/getlandlordfull", {
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

          setPhone(theValues.phone);
          setName(theValues.name);
          setCsz(theValues.csz);
          setAddress(theValues.address);
          setUpdateID(theValues._id);
        } else {
          clearBox();
        }
      });
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteID(null);
  };

  const handleOpenDelete = (theID: string) => {
    setOpenDelete(true);
    setDeleteID(theID);
  };

  const handleClose = () => {
    setOpen(false);
    clearBox();
  };

  const clearBox = () => {
    setPhone("");
    setName("");
    setCsz("");
    setAddress("");
    setUpdateID(null);
  };

  return (
    <div style={{ marginBottom: "40px" }} className="about">
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogActions>
          <Button autoFocus onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteLandlord} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Landlord Edit"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            type="phone"
            fullWidth
            value={phone}
            onChange={handlePhoneChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="address"
            fullWidth
            value={address}
            onChange={handleAddressChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="csz"
            label="City State, Zip"
            type="csz"
            fullWidth
            value={csz}
            onChange={handleCszChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleSubmit();
            }}
            color="primary"
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Grid>
        <Typography variant="h6" className={classes.title}>
          Landlords
          <Tooltip title="Create a new landlord">
            <Fab
              style={{ float: "left", marginTop: "20px", zIndex: 100 }}
              color="primary"
              aria-label="add"
              onClick={() => {
                clearBox();
                setOpen(true);
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>
                Search Landlords
              </Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}></Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="caption">
                Search by landlords name
                <br />
                <TextField
                  value={searchName}
                  onChange={handleSearchNameChange}
                  label="Name"
                />
              </Typography>
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="caption">
                Search by landlords phone
                <br />
                <TextField
                  value={searchPhone}
                  onChange={handleSearchPhoneChange}
                  label="Phone"
                />
              </Typography>
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="caption">
                Search by landlords location
                <br />
                <TextField
                  value={searchLocation}
                  onChange={handleSearchLocationChange}
                  label="Location"
                />
              </Typography>
            </div>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button onClick={handleSearchReset} size="small">
              Reset
            </Button>
            <Button onClick={handleSearchSubmit} size="small" color="primary">
              Search
            </Button>
          </AccordionActions>
        </Accordion>
        <div className={classes.demo}>
          <List dense={false}>{isLoaded ? allLandlords : <></>}</List>
        </div>
      </Grid>
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => {
          setSnackOpen(false);
        }}
      >
        {snackbarAlert}
      </Snackbar>
    </div>
  );
};

export default LandlordList;
