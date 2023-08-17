import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loadImage } from "../../helpers";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Skeleton } from "@material-ui/lab";



interface Props {
  [key: string]: string | JSX.Element | string[];
  width: string;
  height: string;
  srcUrl: string[];
  bed: string;
  bath: string;
  address: string;
  addressBottom: string;
  sqft: string;
  price: string;
  propertyID: string;
  hrefUrl?: string;
}



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',

    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',

  },

}));

const PropertyPreview: React.FC<Props> = (
  props: Props
): React.ReactElement<Props> => {
  const history = useHistory();
  const [imgLoaded, setImgLoaded] = useState(false);

  const classes = useStyles();

  //If we do not send an src default to this websites route property/info
  let to: any;
  if (props.hrefUrl) {
    to = "#";
  } else {
    to = `propertyinfo/${props.propertyID}`;
  }


  useEffect(() => {

    //Reacts way of handling image loading.
    //This way we can use a skeleton before the load so it looks nicer : )
    loadImage(props.srcUrl[0]).then(() => { setImgLoaded(true) });

  }, [])

  return (
    <span style={{ cursor: "pointer" }} onClick={() => {
      if (props.hrefUrl) {
        window.open(
          props.hrefUrl,
          '_blank' // <- This is what makes it open in a new window.
        );
      } else {
        history.push(to);
      }
    }} >
      <div style={{
        borderWidth: "1px",
        borderColor: "black",
        borderStyle: "solid",
        padding: "15px", overflow: "hidden", height: "270px", width: "360px", position: "relative", display: "inline-block", margin: "5px"
      }} className={classes.root}>
        {imgLoaded ?
          (<img className="fl-photo" src={props.srcUrl[0]} alt={props.srcUrl[0]} />)
          : (<><Skeleton variant="text" /> <Skeleton className="fl-photo" height={"100%"} variant="rect" /></>)
        }
        <div className="preview-bottom" style={{ display: "flex", color: "white", left: 0, bottom: 0, width: "100%", position: "absolute", zIndex: 100 }}>
          <div style={{ paddingLeft: "5px", textAlign: "left", width: "50%", float: "left" }}>
            <div style={{ fontSize: "18px" }}>{props.price}</div>
            <div style={{ fontSize: "12px" }}>{`${props.address} ${props.unit ? " Unit: " + props.unit : ""}`}</div>
            <div>{props.addressBottom}</div>
          </div>
          <div style={{ alignItems: "flex-end", display: "flex" }}>
            <div className="preview-bottom-right">BEDS <br /> {props.bed}</div>
            <div className="preview-bottom-right">BATHS <br /> {props.bath}</div>
            <div className="preview-bottom-right">SQFT <br /> {props.sqft}</div></div>
        </div>



      </div >
    </span >
  );

};

export default PropertyPreview;
