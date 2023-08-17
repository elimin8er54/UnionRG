import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export enum Status {
  Insert,
  Update,
}

type Props = {
  landlordID: string;
  isOpen: boolean;
  onSubmit?: ([{}]) => void;
  onClose: () => void;
  status: Status;
};

const LandlordHandler = (props: Props) => {
  const [phone, setPhone] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [csz, setCsz] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (props.isOpen) {
      if (props.status === Status.Insert) {
        clearBox();
      }
      handleGetLandlord(newLandlordID);
    }
  }, [props.isOpen]);
  let newLandlordID = props.landlordID;
  //Dont remove this
  if (props.status === Status.Insert) {
    newLandlordID = "None";
  }

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
          // setUpdateID(theValues._id);
        } else {
          clearBox();
        }
      });
  };

  const handleSubmit = () => {
    const data = {
      address: address,
      csz: csz,
      phone: phone,
      name: name,
      id: newLandlordID,
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
        if (!response.ok) {
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          props.onSubmit(data.values);
        } else {
        }
      });
  };

  const handleClose = () => {
    props.onClose();
  };

  const clearBox = () => {
    setPhone("");
    setName("");
    setCsz("");
    setAddress("");
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={props.isOpen}
        onClose={props.onClose}
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
          <Button onClick={handleClose} color="primary">
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
    </>
  );
};

export default LandlordHandler;
