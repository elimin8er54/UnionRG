import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Helper from "../../helpers/helper";



type Props = {
  landlordName: string;
  landlordPhone: string;
  landlordID: string;
  landlordCsz: string;
  landlordAddress: string;
  handleDeleteLandlord: (theID: string) => void;
  handleEditClick: (theID: string) => void;
};

const LandlordSummary = (props: Props) => {
  return (
    <>
      <ListItem>
        <ListItemText
          primary={props.landlordName}
          secondary={
            Helper.formatPhoneNumber(props.landlordPhone) +
            ", " +
            props.landlordAddress +
            " " +
            props.landlordCsz
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              props.handleEditClick(props.landlordID);
            }}
            edge="end"
            aria-label="edit"
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              props.handleDeleteLandlord(props.landlordID);
            }}
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default LandlordSummary;
