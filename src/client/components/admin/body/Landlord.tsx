import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Helper from "../../../helpers/helper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";

import { BrowserRouter as Router, Route, useParams } from "react-router-dom";

type Params = {
  id: string;
};
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
  })
);
const Landlord = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const [src, setSrc] = useState(null);
  const [imgPath, setImgPath] = useState("");
  const [snackbarAlert, setSnackbarAlert] = useState(
    <Alert severity="success">Default Placeholder!</Alert>
  );
  const [open, setOpen] = React.useState(false);
  const params: Params = useParams();

  const classes = useStyles();
  function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    if (params.id) {
      handleGetAgent();
    }
  }, []);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  };

  const handleLoginChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLogin(event.target.value as string);
  };

  const handleSrcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSrc(event.target.files[0]);

    setImgPath(URL.createObjectURL(event.target.files[0]));
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPassword(event.target.value as string);
  };

  const handleEmailChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEmail(event.target.value as string);
  };

  const handlePhoneChnage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPhone(event.target.value as string);
  };

  const handleBioChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBio(event.target.value as string);
  };

  const handleIsAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked as boolean);
  };

  const handleTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTitle(event.target.value as string);
  };

  const handleIsShownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsShown(event.target.checked as boolean);
  };

  const handleSubmit = () => {
    setOpen(true);
    const formData = new FormData();
    formData.append("login", login);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("isAdmin", isAdmin.toString());
    formData.append("isShown", isShown.toString());
    formData.append("title", title);
    //This is to tell the server which dir to put the file in
    formData.append("dir", "agents");
    formData.append("src", src);

    fetch("/api/updateagentfull", {
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      body: formData,
    })
      .then((response) => {
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
        } else {
          setSnackbarAlert(<Alert severity="error">Error Occured!</Alert>);
        }
      });
  };

  const handleGetAgent = () => {
    const data = {
      position: params.id,
    };

    fetch("/api/getagentfull", {
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

          setLogin(theValues.login);
          setPassword(theValues.password);
          setEmail(theValues.email);
          setPhone(theValues.phone);
          setName(theValues.name);
          setBio(theValues.bio);
          setIsAdmin(theValues.isAdmin);
          setTitle(theValues.title);
          setIsRemoved(theValues.isRemoved);
          setIsShown(theValues.isShown);
          setImgPath(Helper.getHttpProto() + theValues.imgPath + theValues.src);
        } else {
          setLogin("");
          setPassword("");
          setEmail("");
          setPhone("");
          setName("");
          setBio("");
          setIsAdmin(false);
          setTitle("");
          setIsRemoved(false);
          setIsShown(false);
          setImgPath("");
        }
      });
  };

  return (
    <div style={{ marginBottom: "40px" }} className="about">
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        {snackbarAlert}
      </Snackbar>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Location</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Select trip destination
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Chip label="Barbados" onDelete={() => {}} />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Select your destination of choice
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}>
                Learn more
              </a>
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
      <div style={{ textAlign: "left" }}>
        <TextField
          onChange={handleNameChange}
          label="URL"
          variant="outlined"
          value={name}
        />
        <TextField
          onChange={handleLoginChange}
          label="Price"
          variant="outlined"
          value={login}
        />
        <TextField
          onChange={handlePasswordChange}
          label="Street"
          variant="outlined"
          value={password}
        />
        <TextField
          onChange={handleEmailChange}
          label="City"
          variant="outlined"
          value={email}
        />
        <TextField
          onChange={handlePhoneChnage}
          label="Bed"
          variant="outlined"
          value={phone}
        />
        <TextField
          onChange={handleTitleChange}
          label="Bath"
          variant="outlined"
          value={title}
        />
        <TextField
          onChange={handleBioChange}
          label="SQFT"
          variant="outlined"
          value={bio}
        />
        <br /> <br />
        <FormControlLabel
          control={
            <Switch
              checked={isAdmin}
              onChange={handleIsAdminChange}
              color="primary"
            />
          }
          label="Admin?"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isShown}
              onChange={handleBioChange}
              color="primary"
            />
          }
          label="Show Bio?"
        />
        <Button variant="contained" component="label">
          Choose File
          <input type="file" hidden onChange={handleSrcChange} />
        </Button>
        <div style={{ width: "300px" }}>
          <img style={{ width: "100%" }} src={imgPath} />
        </div>
        <br /> <br />
        <Button variant="contained" component="label" onClick={handleSubmit}>
          Update
        </Button>
      </div>

      <div className="spacer" style={{ clear: "both" }}></div>
    </div>
  );
};

export default Landlord;
