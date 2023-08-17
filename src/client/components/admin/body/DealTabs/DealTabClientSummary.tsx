import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import RemoveIcon from "@material-ui/icons/Remove";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

type Props = {
  deleteClient: (clientName: string) => void;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  getClientInfo: ({}: any) => void;
  id: string;

  isNew: boolean;
};

const DealTabClientSummary = (props: Props) => {
  const [clientName, setClientName] = useState(props.clientName);
  const [clientPhone, setClientPhone] = useState(props.clientPhone);
  const [clientEmail, setClientEmail] = useState(props.clientEmail);
  const [submitValidation, setSubmitValidation] = useState(false);

  //This is so we wait till the next rerender before getting the state lifted
  //We do this so we dont have to make a bunch of event.target.value splits with state splits

  useEffect(() => {
    if (submitValidation) {
      props.getClientInfo({
        clientName: clientName,
        clientPhone: clientPhone,
        clientEmail: clientEmail,
        id: props.id,
        isNew: props.isNew,
      });
      setSubmitValidation(false);
    }
  }, [submitValidation]);

  const handeClientNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClientName(event.target.value as string);
    setSubmitValidation(true);
  };

  const handleClientPhoneChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setClientPhone(event.target.value as string);
    setSubmitValidation(true);
  };

  const handleClientEmailChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setClientEmail(event.target.value as string);
    setSubmitValidation(true);
  };

  const deleteClientHandler = (event: React.MouseEvent<{ value: unknown }>) => {
    props.deleteClient(props.id);
  };

  const passHandler = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="caption">
              <TextField
                value={clientName}
                onChange={handeClientNameChange}
                label="Client Name"
                name="clientName"
              />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="caption">
              <TextField
                value={clientPhone}
                onChange={handleClientPhoneChange}
                label="Client Phone"
                name="clientPhone"
              />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper>
            <Typography variant="caption">
              <TextField
                value={clientEmail}
                onChange={handleClientEmailChange}
                label="Client Email"
                name="clientEmail"
                fullWidth={true}
              />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Delete Client">
            <Fab
              size="small"
              style={{ zIndex: 100 }}
              color="primary"
              aria-label="delete"
              onClick={deleteClientHandler}
            >
              <RemoveIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};

export default DealTabClientSummary;
