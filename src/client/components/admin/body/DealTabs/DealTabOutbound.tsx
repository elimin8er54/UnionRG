import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import DealTabOutboundSummary, { Money } from "./DealTabOutboundSummary";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

type Props = {
  id: string;
  money: Money;
  onUpdate?: (snack: any, inboundInfo: any) => void;
};

const DealTabOutbound = (props: Props) => {
  const [inboundInfo, setInboundInfo] = useState([]);
  const [inboundCounter, setInboundCounter] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    props.onUpdate({ message: "Error", type: "error" }, inboundInfo);

    if (isLoaded) {
    } else {
      handleGetInbound();
    }
  }, [inboundInfo]);

  const handleGetInbound = () => {
    const data = {
      dealID: props.id,
    };

    fetch("/api/getdealoutbound", {
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

          setInboundInfo(data.values);
        }
      });
  };

  const addRowHandler = (event: React.MouseEvent<{ value: unknown }>) => {
    setInboundInfo([
      ...inboundInfo,

      {
        inboundPurpose: "",
        inboundAmount: "",
        inboundCheck: "",
        inboundNotes: "",
        _id: inboundCounter,
        isNew: true,
        key: inboundCounter,
      },
    ]);

    setInboundCounter(inboundCounter + 1);
  };

  const deleteInbound = (key: string) => {
    const asd = inboundInfo.filter((elem: any) => {
      return elem._id !== key;
    });

    setInboundInfo(asd);
  };

  const getInboundInfo = (inbound: any) => {
    //If id matches update or else map the same value it already was
    let asd = inboundInfo.map((x) => {
      let a;
      if (inbound.id === x._id) {
        a = {
          inboundPurpose: inbound.inboundPurpose,
          inboundAmount: inbound.inboundAmount,
          inboundCheck: inbound.inboundCheck,
          inboundNotes: inbound.inboundNotes,
          _id: inbound.id,
          key: inbound.id,
          isNew: inbound.isNew,
        };
      } else {
        a = {
          inboundPurpose: x.inboundPurpose,
          inboundAmount: x.inboundAmount,

          inboundCheck: x.inboundCheck,
          inboundNotes: x.inboundNotes,
          _id: x._id,
          key: x._id,
          isNew: x.isNew,
        };
      }
      return a;
    });
    setInboundInfo(asd);
  };

  const inboundList = inboundInfo.map((elem: any) => {
    return (
      <DealTabOutboundSummary
        money={props.money}
        inboundPurpose={elem.inboundPurpose}
        inboundAmount={elem.inboundAmount}
        inboundCheck={elem.inboundCheck}
        inboundNotes={elem.inboundNotes}
        deleteInbound={deleteInbound}
        getInboundInfo={getInboundInfo}
        id={elem._id}
        isNew={elem.isNew}
        key={elem._id}
      />
    );
  });

  const updateInboundHandler = (
    event: React.MouseEvent<{ value: unknown }>
  ) => {
    handleSubmit();
  };
  const handleSubmit = () => {
    const data = { values: inboundInfo, dealID: props.id };
    fetch("/api/updatedealoutbound", {
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
          // props.titleUpdate("Deal Created");
          //  props.onUpdate({ message: "Updated!", type: "success" }, inboundInfo);
        } else {
          //  props.onUpdate({ message: "Error", type: "error" }, inboundInfo);
        }
      });
  };
  return (
    <>
      <Grid container spacing={1}>
        {inboundList}
        <div style={{ marginTop: "30px", float: "left" }}>
          <Tooltip title="Add Payment">
            <Fab
              size="small"
              style={{ zIndex: 100 }}
              color="primary"
              aria-label="add"
              onClick={addRowHandler}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <Button onClick={updateInboundHandler} color="primary">
            Save
          </Button>
        </div>
      </Grid>
    </>
  );
};

export default DealTabOutbound;