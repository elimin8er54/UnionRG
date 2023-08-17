import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Person from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Helper from "../../helpers/helper";
import ReplayIcon from "@material-ui/icons/Replay";

type Props = {
  agentName: string;
  agentPhoto: string;
  agentID: string;
  lastLogin: Date;
  isRemoved: boolean;
  handleDeleteAgent: (theID: string) => void;
};

const AgentSummary = (props: Props) => {
  const history = useHistory();

  const handlePageChange = () => {
    history.push("/admin/agent/" + props.agentID);
  };

  let lastLogin;
  if (!props.lastLogin) {
    lastLogin = "N/A";
  } else {
    const theDate = new Date(props.lastLogin);

    lastLogin =
      theDate.toDateString() +
      " | " +
      " " +
      theDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
  }

  let logo;
  let title;
  if (props.isRemoved) {
    logo = <ReplayIcon />;
    title = "Activate Agent";
  } else {
    logo = <DeleteIcon />;
    title = "Delete Agent";
  }

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          {props.agentPhoto ? (
            <Avatar src={Helper.getHttpProto() + props.agentPhoto} />
          ) : (
            <Avatar>
              <Person />
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={props.agentName}
          secondary={true ? "Last Login: " + lastLogin : null}
        />
        <ListItemSecondaryAction>
          <Tooltip title="Edit Agent">
            <IconButton onClick={handlePageChange} edge="end" aria-label="Edit">
              <CreateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={title}>
            <IconButton
              onClick={() => {
                props.handleDeleteAgent(props.agentID);
              }}
              edge="end"
              aria-label="delete"
            >
              {logo}
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default AgentSummary;
