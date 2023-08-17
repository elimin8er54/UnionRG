// @ts-nocheck

import React, { useEffect } from "react";
import "../../App.css";
import ContactManager from "../reused/ContactManager";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from '@material-ui/icons/LinkedIn';


//Googles type defs are bugged so I skipped type checking here 

const Contact = () => {

  const loadScript = (url) => new Promise(resolve => {
    //Don't create another map script tag if one exists.
    if (!document.getElementById('map-script')) {
      const tag = document.createElement('script');
      tag.async = false;
      tag.src = url;
      const body = document.body;
      body.appendChild(tag);
      tag.addEventListener('load', resolve, {
        once: true
      });
    } else {
      //if it already exists then there is no issue. Resolve it!
      resolve();

    }
  });

  //Using promise all even though it's just an array of one element. Not a big deal though.
  useEffect(() => {
    Promise.all(Object.values(urls).map(loadScript))
      .then(setMap);


  }, [urls]);

  //We could just have this as a url and not in an object so we do not have to use "Objects.values" to get the value from the object.
  const urls = ({ googleMaps: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB7RyP9aW7VcYGYrBuRzQ3yqoYT6F--rw8" });

  function setMap() {
    const myLatLng = { lat: 42.34906152165905, lng: -71.22941960199452 };
    const map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 18
    });
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Union Realty Group",
    });
  }


  return (
    <div className="contact">

      <div id="map" className="map"></div>
      <div className="contact-top"><h3>109 Elm Street<br />
      Newton, MA 02456<br />
      info@UnionRG.com<br /><br />
      Follow our social media
      <br />
        <a target="_blank" href="https://www.facebook.com/unionrealtyg">
          <FacebookIcon />
        </a>
        <a target="_blank" href="https://www.instagram.com/unionrealtygroup/">
          <InstagramIcon />
        </a>
        <a target="_blank" href="https://www.linkedin.com/company/union-realty-group">
          <  LinkedInIcon />
        </a></h3></div>

      <div className="contact-cm"><ContactManager textGhost={"Type your message here..."} /></div>
    </div >
  );
}

export default Contact;
