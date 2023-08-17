import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Helper from "../../helpers/helper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
const PropertyPreview = () => {
  const [slides, setSlides] = useState(<></>);
  const [imgPath, setImgPath] = useState("");
  const [src, setSrc] = useState(null);
  const [type, setType] = useState("1");
  const [snackbarAlert, setSnackbarAlert] = useState(
    <Alert severity="success">Default Placeholder!</Alert>
  );
  const [open, setOpen] = React.useState(false);
  function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
  };

  useEffect(() => {
    getAllSlides("1");
  }, []);

  const deletePhoto = (event: any) => {
    deleteSlide(event.currentTarget.getAttribute("data-key"));
  };

  const handleTypeChange = (event: React.ChangeEvent<{ value: string }>) => {
    setType(event.target.value as string);
    setSlides(<CircularProgress />);
    ///We cant pass the state because the state wont be updated till the next render.
    getAllSlides(event.target.value as string);
  };

  const handleSlideAdd = () => {
    addSlide(type);
    ///We cant pass the state because the state wont be updated till the next render.
  };

  const handleSrcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSrc(event.target.files[0]);

    setImgPath(URL.createObjectURL(event.target.files[0]));
  };

  const getAllSlides = (type: string) => {
    const data = {
      dir: Helper.getType(type),
    };

    fetch("/api/getallslides", {
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

          setSlides(
            data.values.map((element: any) => {
              return (
                <div style={{ position: "relative" }}>
                  <img
                    style={{ width: "100%" }}
                    src={
                      Helper.getHttpProto() + theValues.imgPath + element.src
                    }
                  />

                  <Button
                    style={{
                      position: "absolute",
                      display: "block",
                      right: "0px",
                      top: "0px",
                      marginTop: "10px",
                      marginRight: "10px",
                    }}
                    data-key={element._id}
                    onClick={deletePhoto}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </div>
              );
            })
          );
        } else {
          console.log(data);
          setSlides(<></>);
          setImgPath("");
          setSrc(null);
        }
      });
  };

  const deleteSlide = (id: string) => {
    const data = {
      id: id,
    };

    fetch("/api/deleteslide", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        setOpen(true);
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          getAllSlides(type);

          setImgPath("");
          setSrc(null);
          setSnackbarAlert(
            <Alert severity="success">Deletion was a success!</Alert>
          );
        } else {
          console.log(data);
          setSnackbarAlert(<Alert severity="error">Error Occured!</Alert>);
        }
      });
  };

  const addSlide = (type: string) => {
    const formData = new FormData();

    formData.append("dir", Helper.getType(type));
    formData.append("src", src);

    fetch("/api/addslide", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((response) => {
        setOpen(true);
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          getAllSlides(type);

          setImgPath("");
          setSrc(null);
          setSnackbarAlert(
            <Alert severity="success">Update was a success!</Alert>
          );
        } else {

          setSnackbarAlert(
            <Alert severity="error">
              Error Occured! Did you chose a file yet?
            </Alert>
          );
        }
      });
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        {snackbarAlert}
      </Snackbar>
      <FormControl>
        <InputLabel id="demo-simple-select-helper-label">Slide</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={type}
          onChange={handleTypeChange}
        >
          <MenuItem value={"1"}>Sales</MenuItem>
          <MenuItem value={"2"}>Lease</MenuItem>
          <MenuItem value={"3"}>Property Management</MenuItem>
          <MenuItem value={"4"}>Careers</MenuItem>
          <MenuItem value={"5"}>Forms</MenuItem>
        </Select>
        <FormHelperText>Which SlideShow?</FormHelperText>
      </FormControl>
      <br /> <br />
      <Button variant="contained" component="label">
        Choose File
        <input type="file" hidden onChange={handleSrcChange} />
      </Button>
      <br /> <br />
      <Button variant="contained" component="label" onClick={handleSlideAdd}>
        Update
      </Button>
      <div style={{ width: "500px" }}>
        <img style={{ width: "100%" }} src={imgPath} />
      </div>
      <div style={{ width: "500px" }}>{slides}</div>
      <div className="spacer" style={{ clear: "both" }}></div>
    </>
  );
};

export default PropertyPreview;
