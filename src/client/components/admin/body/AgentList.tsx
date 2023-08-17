import React, { useEffect, useState } from "react";
import AgentSummary from "../../reused/AgentSummary";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme: any) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  },
}));

const AgentList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [allAgents, setAllAgents] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [status, setStatus] = useState("1");
  const [isRemoved, setIsRemoved] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    handleGetAgents(isRemoved);
  }, []);

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
    if (event.target.value === "1") {
      setIsRemoved(false);
      handleGetAgents(false);
    } else if (event.target.value === "2") {
      setIsRemoved(true);
      handleGetAgents(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteID(null);
  };

  const handleOpen = (theID: string) => {
    setOpen(true);
    setDeleteID(theID);
  };
  const handleDeleteAgent = () => {
    const data = {
      id: deleteID,
      isRemoved: !isRemoved,
    };

    fetch("/api/deleteagent", {
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
          setOpen(false);
          handleGetAgents(isRemoved);
        } else {
        }
      });
  };

  const handleGetAgents = (isRemoved: boolean) => {
    const data = {
      isRemoved: isRemoved,
    };

    fetch("/api/getagents", {
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

          setAllAgents(
            data.values.map((element: any) => {
              return (
                <AgentSummary
                  lastLogin={element.lastLogin}
                  agentName={element.name}
                  agentID={element._id}
                  agentPhoto={data.values[0].imgPath + element.src}
                  handleDeleteAgent={handleOpen}
                  isRemoved={isRemoved}
                />
              );
            })
          );
        } else {
        }
      });
  };

  const handlePageChange = () => {
    history.push("/admin/agent/");
  };

  return (
    <div style={{ marginBottom: "40px", marginTop: "150px" }} className="about">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAgent} color="primary" autoFocus>
            {isRemoved ? "Activate" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
      <Grid>
        <Typography
          style={{ position: "relative" }}
          variant="h6"
          className={classes.title}
        >
          <span style={{ position: "absolute", left: 0 }}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select value={status} onChange={handleStatusChange}>
                <MenuItem value={"1"}>Active</MenuItem>
                <MenuItem value={"2"}>Removed</MenuItem>
              </Select>
            </FormControl>
          </span>
          Agents
          <Tooltip title="Create a new agent">
            <Fab
              style={{ float: "right", marginTop: "20px", zIndex: 20 }}
              color="primary"
              aria-label="add"
              onClick={handlePageChange}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Typography>
        <div className={classes.demo}>
          <List dense={false}>{isLoaded ? allAgents : <></>}</List>
        </div>
      </Grid>
    </div>
  );
};

export default AgentList;
