import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import DealTabClientSummary from "./DealTabClientSummary";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

type Props = {
  id: string;
  paramUpdater: (theID: string) => void;
  titleUpdate: (theID: string) => void;
  onUpdate: (snack: any) => void;
};

const DealTabClient = (props: Props) => {
  const [clientInfo, setClientInfo] = useState([]);
  const [clientCounter, setClientCounter] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    handleGetClients();
  }, []);

  const handleGetClients = () => {
    const data = {
      dealID: props.id,
    };

    fetch("/api/getdealclient", {
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

          setClientInfo(data.values);
        }
      });
  };

  const addRowHandler = (event: React.MouseEvent<{ value: unknown }>) => {
    setClientInfo([
      ...clientInfo,

      {
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        _id: clientCounter,
        isNew: true,
        key: clientCounter,
      },
    ]);

    setClientCounter(clientCounter + 1);
  };

  const deleteClient = (key: string) => {
    const asd = clientInfo.filter((elem: any) => {
      return elem._id !== key;
    });

    setClientInfo(asd);
  };

  const getClientInfo = (client: any) => {
    let asd = clientInfo.map((x) => {
      let a;
      if (client.id === x._id) {
        a = {
          clientName: client.clientName,
          clientPhone: client.clientPhone,
          clientEmail: client.clientEmail,
          _id: client.id,
          key: client.id,
          isNew: client.isNew,
        };
      } else {
        a = {
          clientName: x.clientName,
          clientPhone: x.clientPhone,
          clientEmail: x.clientEmail,
          _id: x._id,
          key: x._id,
          isNew: x.isNew,
        };
      }
      return a;
    });
    setClientInfo(asd);
  };

  const clientList = clientInfo.map((elem: any) => {
    return (
      <DealTabClientSummary
        clientName={elem.clientName}
        clientEmail={elem.clientEmail}
        clientPhone={elem.clientPhone}
        deleteClient={deleteClient}
        getClientInfo={getClientInfo}
        id={elem._id}
        isNew={elem.isNew}
        key={elem._id}
      />
    );
  });

  const updateClientHandler = (event: React.MouseEvent<{ value: unknown }>) => {
    handleSubmit();
  };
  const handleSubmit = () => {
    const data = { values: clientInfo, dealID: props.id };
    fetch("/api/updatedealclient", {
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
          console.log(data.dealID);
          props.paramUpdater(data.dealID);
          // props.titleUpdate("Deal Created");
          props.onUpdate({ message: "Updated!", type: "success" })
        } else {
          props.onUpdate({ message: "Error", type: "error" });
        }
      });
  };
  return (
    <>
      {clientList}
      <div style={{ marginTop: "30px", float: "left" }}>
        <Tooltip title="Add Client">
          <Fab
            style={{ zIndex: 100 }}
            color="primary"
            aria-label="add"
            onClick={addRowHandler}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <Button onClick={updateClientHandler} color="primary">
          Save
        </Button>
      </div>
    </>
  );
};

export default DealTabClient;
