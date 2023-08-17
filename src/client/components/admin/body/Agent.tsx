import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Helper from "../../../helpers/helper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import { BrowserRouter as Router, Route, useParams } from "react-router-dom";

type Params = {
  id: string;
};

const Agent = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [initial, setInitial] = useState("");
  const [bio, setBio] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const history = useHistory();
  const [src, setSrc] = useState(null);
  const [imgPath, setImgPath] = useState("");
  const [snackbarAlert, setSnackbarAlert] = useState(
    <Alert severity="success">Default Placeholder!</Alert>
  );
  const [open, setOpen] = React.useState(false);
  const params: Params = useParams();
  let pageTitle = "Loading...";
  let buttonTitle = "Loading...";
  if (params.id) {
    pageTitle = "Update Agent";
    buttonTitle = "Update";
  } else {
    pageTitle = "Create Agent";
    buttonTitle = "Create";
  }
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

  const handleInitialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitial(event.target.value as string);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("username", login);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("isRemoved", false.toString());
    formData.append("isAdmin", isAdmin.toString());
    formData.append("isShown", isShown.toString());
    formData.append("initial", initial);
    formData.append("title", title);
    //This is to tell the server which dir to put the file in
    formData.append("dir", "agents");

    formData.append("id", params.id || "None");
    formData.append("src", src);
    fetch("/api/updateagentfull", {
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      body: formData,
    })
      .then((response) => {
        setOpen(true);
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
          if (!params.id) {
            history.push("/admin/agentlist");
          }
        } else {
          setSnackbarAlert(<Alert severity="error">Error Occured!</Alert>);
        }
      });
  };

  const handleGetAgent = () => {
    const data = {
      id: params.id || "",
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

          setLogin(theValues.username);

          setEmail(theValues.email);
          setPhone(theValues.phone);
          setName(theValues.name);
          setBio(theValues.bio);
          setIsAdmin(theValues.isAdmin);
          setTitle(theValues.title);
          setIsRemoved(theValues.isRemoved);
          setIsShown(theValues.isShown);
          setInitial(theValues.initial);
          setImgPath(Helper.getHttpProto() + theValues.imgPath + theValues.src);
        } else {
          setLogin("");
          setInitial("");
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
      <Typography variant="h6">{pageTitle}</Typography>
      <div className="customBorder"> </div>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        {snackbarAlert}
      </Snackbar>
      <div
        className="htmlGroup"
        style={{ textAlign: "left", marginTop: "50px" }}
      >
        <TextField onChange={handleNameChange} label="Name" value={name} />
        <TextField
          onChange={handleLoginChange}
          label="Username"
          value={login}
        />
        <TextField
          autoComplete="new-password"
          onChange={handlePasswordChange}
          label="Password"
          value={password}
          type={"password"}
        />
        <TextField onChange={handleEmailChange} label="EMail" value={email} />
        <TextField onChange={handlePhoneChnage} label="Phone" value={phone} />
        <TextField
          onChange={handleTitleChange}
          label="Bio Title"
          value={title}
        />
        <TextField
          onChange={handleInitialChange}
          label="Initials"
          required
          value={initial}
        />
        <br /> <br />
        <TextField
          onChange={handleBioChange}
          label="Bio"
          multiline
          rows={10}
          style={{ width: "500px" }}
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
              onChange={handleIsShownChange}
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
          {buttonTitle}
        </Button>
      </div>

      <div className="spacer" style={{ clear: "both" }}></div>
    </div>
  );
};

export default Agent;
