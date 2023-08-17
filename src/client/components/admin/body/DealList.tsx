import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "@material-ui/core/Switch";

import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridRowsProp,
} from "@material-ui/data-grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PauseIcon from "@material-ui/icons/Pause";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from '@material-ui/icons/Done';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import ReplayIcon from "@material-ui/icons/Replay";
import Helper from "../../../helpers/helper";
const useStyles = makeStyles((theme: any) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const DealList = () => {
  const handlePageChange = (dealId: string) => {
    history.push("/admin/deal/" + dealId);
  };
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [agent, setAgent] = useState("");
  const [type, setType] = useState("Lease");
  const [status, setStatus] = useState("Active");
  const [agents, setAgents] = useState(null);
  const [deleteID, setDeleteID] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);
  const [srvData, setSrvData] = useState([]);
  const [theUser, setTheuser] = useState([{ initial: "Loading..." }]);
  const classes = useStyles();

  const [page, setPage] = React.useState(0);





  const rows: GridRowsProp = srvData.map((element: any) => {

    return {
      id: element._id,

      status: element.dealStatus,
      isRemoved: element.isRemoved,
      col1: Helper.getDealID(element.dealCreatedDate, theUser[0].initial, element.dealCount, element.isCoBroke),
      col2: element.leaseStreadAddress || element.leaseCity ? element.leaseStreetAddress + " " + element.leaseCity : "",
      col3: element.name,
      col4: Helper.getDay(new Date(element.moveInDate)) || "",
      col5: element.monthyInstallment ? "$" + element.monthyInstallment.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }) : "",

      col6: "",
    };

  });

  const columns: GridColDef[] = [
    {
      field: "col1", headerName: "Deal #", width: 150, renderCell: (params: GridCellParams) => {

        let status = getColor(params.getValue(params.id, "id").toString());
        // console.log(params.getValue("id").toString())
        let style = {};
        if (status === "balanced") {
          style = { padding: "5px", borderLeft: "5px solid green" }
        } else if (status === "notbalanced") {
          style = { padding: "5px", borderLeft: "5px solid red" }
        }
        //  console.log(color)
        return <span style={style}>
          {
            <Tooltip title="Edit Deal">
              <p
                className="deal-list-id"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handlePageChange(params.getValue(params.id, "id").toString());
                }}

                aria-label="edit"
              >
                {params.getValue(params.id, "col1").toString()}
              </p>
            </Tooltip>
          }

        </span >
      },
    },
    { field: "col2", headerName: "Address", width: 270 },
    { field: "col3", headerName: "Landlord", width: 200 },
    { field: "col4", headerName: "Move In Date", width: 150 },
    { field: "col5", headerName: "Rent", width: 100 },
    {
      field: "col6",
      headerName: "Options",
      renderCell: (params: GridCellParams) => (
        <strong>
          {
            <Tooltip title="Lease Renewal">
              <IconButton
                onClick={() => {
                  handleCreateLeaseRenewal(params.getValue(params.id, "id").toString());
                }}
                edge="end"
                aria-label="renewal"
              >
                <ReplayIcon />
              </IconButton>
            </Tooltip>}
          {params.getValue(params.id, "status") === "Active" ?
            <><Tooltip title="Set Deal to Inactive">
              <IconButton onClick={() => {
                handleChangeType(params.getValue(params.id, "id").toString(), "Inactive");
              }} edge="end" aria-label="inactive deal">
                <PauseIcon />
              </IconButton>
            </Tooltip>{/*<Tooltip title="Close Deal">
                <IconButton onClick={() => {
                  handleChangeType(params.getValue("id").toString(), "Closed");
                }} edge="end" aria-label="Closed deal">
                  <DoneIcon />
                </IconButton>
              </Tooltip>*/}</> : <></>}
          {params.getValue(params.id, "status") === "Inactive" ?
            <Tooltip title="Set Deal to Active">
              <IconButton onClick={() => {
                handleChangeType(params.getValue(params.id, "id").toString(), "Active");
              }} edge="end" aria-label="active deal">
                <DoneIcon />
              </IconButton>
            </Tooltip> : <></>}

          {params.getValue(params.id, "status") !== "Closed" ?
            <Tooltip title={params.getValue(params.id, "isRemoved") === false ?
              "Delete Deal" : "Revert Delete"}>
              <IconButton
                onClick={() => {
                  handleOpenDelete(params.getValue(params.id, "id").toString());
                }}
                edge="end"
                aria-label="delete"
              >
                {params.getValue(params.id, "isRemoved") === false ?
                  <DeleteIcon /> : <ReplayIcon />}
              </IconButton>
            </Tooltip> : <></>}
        </strong>
      ),
      width: 200,
    },
  ];

  const getColor = (dealID: string) => {

    let balance = 0;
    srvData.forEach((y: any) => {

      if (y._id === dealID) {
        // console.log("asd")
        let a = parseFloat(y.firstMonthFee) || 0 +
          parseFloat(y.lastMonthFee) || 0 +
          parseFloat(y.securityFee) || 0 +
          parseFloat(y.appFee) || 0 +
          parseFloat(y.tenantFee) || 0 +
          parseFloat(y.landlordFee) || 0 +
          parseFloat(y.keyFee) || 0 +
          parseFloat(y.cleaningFee) || 0

        balance = a - parseFloat(y.inboundTotal);
      }
    })


    if (balance <= 0) {
      return "balanced";
    } else if (balance > 0) {
      return "notbalanced"
    } else {
      "nothing"
    }


  }

  useEffect(() => {

    handleGetAgents();

  }, []);


  const handleCreateLeaseRenewal = (dealID: string) => {
    const data = {
      dealID: dealID,
    };

    fetch("/api/createleaserenewal", {
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

        //setOpenDelete(false);
        handleGetDeals(agent, type, status, showRemoved);

      });
  };

  const handleDeleteDeal = () => {
    const data = {
      dealID: deleteID,
    };

    fetch("/api/deletedeal", {
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

        setOpenDelete(false);
        handleGetDeals(agent, type, status, showRemoved);

      });
  };

  const handleGetAgents = () => {
    fetch("/api/getdealagents", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setAgents(
            data.values.map((element: any) => {
              if (element._id === data.currentUserID) {
                setAgent(element._id);
                handleGetDeals(element._id, type, status, showRemoved);
              }
              return (
                <MenuItem value={element._id}>
                  {element.name.split(" ")[0]}
                </MenuItem>
              );
            })
          );
        }
      });
  };

  const handleGetDeals = (agentID: string, type: string, status: string, showRemoved: boolean) => {
    const data = {
      agentID: agentID,
      type: type,
      status: status,
      showRemoved: showRemoved.toString()
    };
    fetch("/api/getdeallist", {
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
          setSrvData(data.values);
          setTheuser(data.theUser);

        } else {
          setSrvData([]);
        }
      });
  };


  const handleChangeType = (dealID: string, dealStatus: string) => {
    const data = {
      dealID: dealID,
      dealStatus: dealStatus
    };

    fetch("/api/updatedealstatus", {
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


        handleGetDeals(agent, type, status, showRemoved);

      });
  };

  const handleShowRemoved = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowRemoved(event.target.checked as boolean);
    handleGetDeals(agent, type, status, event.target.checked);
  };

  const handleAgentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAgent(event.target.value);
    handleGetDeals(event.target.value, type, status, showRemoved);
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
    handleGetDeals(agent, event.target.value, status, showRemoved);
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    handleGetDeals(agent, type, event.target.value, showRemoved);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteID(null);
  };

  const handleOpenDelete = (theID: string) => {
    setOpenDelete(true);
    setDeleteID(theID);
  };

  return (
    <div style={{ marginBottom: "140px" }} className="about">
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogActions>
          <span style={{ color: "red" }}></span>
          <Button autoFocus onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteDeal} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ height: 400, width: "100%" }}>
        <Typography
          style={{ position: "relative" }}
          variant="h6"
          className={classes.title}
        >
          <span style={{ position: "absolute", left: 0 }}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Agent</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={agent}
                onChange={handleAgentChange}
              >
                {agents}
              </Select>
            </FormControl>
          </span>
          <span style={{ position: "absolute", left: 120 }}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={type}
                onChange={handleTypeChange}
              >
                <MenuItem value={"Lease"}>Lease</MenuItem>
                <MenuItem value={"Sales"}>Sales</MenuItem>
                <MenuItem value={"Renewal"}>Renewal</MenuItem>
              </Select>
            </FormControl>
          </span>
          <span style={{ position: "absolute", left: 240 }}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={handleStatusChange}
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Inactive"}>Inactive</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
            </FormControl>
          </span>
          <span style={{ position: "absolute", right: 0 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={showRemoved}
                  onChange={handleShowRemoved}
                  color="primary"
                />
              }
              label="Show Removed?"
            />
          </span>

            Deals

        </Typography>

        <DataGrid
          page={page}
          onPageChange={(params) => {
            setPage(params);
          }}
          pageSize={5}
          pagination
          rows={rows}
          columns={columns}
          disableColumnMenu
        />
        <Tooltip title="Create a new deal">
          <Fab
            style={{ float: "left", marginTop: "-30px" }}
            color="primary"
            aria-label="add"
            onClick={() => {
              handlePageChange("");
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

export default DealList;
