import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Helper from "../../../helpers/helper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import SlideShowEdit from "../../reused/SlideShowEdit";

const Settings = () => {
  const [src, setSrc] = useState(null);
  const [price, setPrice] = useState("");
  const [sqft, setSqft] = useState("");
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [position, setPosition] = useState("1");
  const [url, setUrl] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [snackbarAlert, setSnackbarAlert] = useState(
    <Alert severity="success">Default Placeholder!</Alert>
  );
  const [open, setOpen] = React.useState(false);
  function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    handleFeaturedChange(1);
  }, []);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPosition(event.target.value as string);
    ///We cant pass the state because the state wont be updated till the next render.
    handleFeaturedChange(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUrl(event.target.value as string);
  };

  const handleSrcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSrc(event.target.files[0]);

    setImgPath(URL.createObjectURL(event.target.files[0]));
  };

  const handlePriceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPrice(event.target.value as string);
  };

  const handleSqftChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSqft(event.target.value as string);
  };

  const handleBedChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBed(event.target.value as string);
  };

  const handleBathChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBath(event.target.value as string);
  };

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCity(event.target.value as string);
  };

  const handleStreetChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStreet(event.target.value as string);
  };

  const handleSubmit = () => {
    setOpen(true);
    if (!/^\d+$/.test(price)) {
      setSnackbarAlert(
        <Alert severity="error">Save failed! Only numbers for price!</Alert>
      );
      return;
    }
    const formData = new FormData();
    formData.append("price", price);
    formData.append("url", url);
    formData.append("sqft", sqft);
    formData.append("bed", bed);
    formData.append("bath", bath);
    formData.append("city", city);
    formData.append("street", street);
    formData.append("position", position);
    //This is to tell the server which dir to put the file in
    formData.append("dir", "properties");
    formData.append("src", src);

    fetch("/api/updatefeatured", {
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

  const handleFeaturedChange = (position: unknown) => {
    const data = {
      position: position,
    };

    fetch("/api/getfeatured", {
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

          setBed(theValues.bed);
          setBath(theValues.bath);
          setStreet(theValues.street);
          setCity(theValues.city);
          setUrl(theValues.url);
          setSrc(theValues.src);
          setPrice(theValues.price);
          setImgPath(Helper.getHttpProto() + theValues.imgPath + theValues.src);
          setSqft(theValues.sqft);
        } else {
          console.log(data);
          setBed("");
          setBath("");
          setStreet("");
          setCity("");
          setUrl("");
          setSrc("");
          setPrice("");
          setSqft("");
          setImgPath("");
        }
      });
  };

  return (
    <div className="about">
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        {snackbarAlert}
      </Snackbar>
      <div style={{ float: "left" }}>
        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">#</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={position}
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
          <FormHelperText>Which YGL listing?</FormHelperText>
        </FormControl>
        <br /> <br />
        <Button variant="contained" component="label">
          Choose File
          <input type="file" hidden onChange={handleSrcChange} />
        </Button>
        <br /> <br />
        <Button variant="contained" component="label" onClick={handleSubmit}>
          Update
        </Button>
        <br /> <br />
        <div style={{ width: "300px" }}>
          <img style={{ width: "100%" }} src={imgPath} />
        </div>
        <br /> <br />
        <TextField
          onChange={handleUrlChange}
          label="URL"
          variant="outlined"
          value={url}
        />
        <br /> <br />
        <TextField
          onChange={handlePriceChange}
          label="Price"
          variant="outlined"
          value={price}
        />
        <br /> <br />
        <TextField
          onChange={handleStreetChange}
          label="Street"
          variant="outlined"
          value={street}
        />{" "}
        <br /> <br />
        <TextField
          onChange={handleCityChange}
          label="City"
          variant="outlined"
          value={city}
        />
        <br /> <br />
        <TextField
          onChange={handleBedChange}
          label="Bed"
          variant="outlined"
          value={bed}
        />{" "}
        <br /> <br />
        <TextField
          onChange={handleBathChange}
          label="Bath"
          variant="outlined"
          value={bath}
        />{" "}
        <br /> <br />
        <TextField
          onChange={handleSqftChange}
          label="SQFT"
          variant="outlined"
          value={sqft}
        />{" "}
        <br /> <br />
      </div>
      <div style={{ float: "left", marginLeft: "20px" }}>
        <SlideShowEdit />
      </div>
      <div className="spacer" style={{ clear: "both" }}></div>
    </div>
  );
};

export default Settings;
