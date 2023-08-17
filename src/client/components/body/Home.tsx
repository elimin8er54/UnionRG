import React, { useEffect, useState } from "react";
import FeaturedListingPhoto from "../reused/FeaturedListingPhoto";
import SearchBar, { Tab } from "../reused/SearchBar";
import FadeInSection from "../FadeInSection";
import ContactManager from "../reused/ContactManager";
import PropertyPreview from "../reused/PropertyPreview";
import Helper from "../../helpers/helper";

import "../../App.css";

const Home = () => {
  const [properties, setProperties] = useState(null);

  useEffect(() => {
    const data = {
      position: [1, 2, 3, 4, 5, 6, 7, 8],
    };
    fetch("/api/getmanyfeatured", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          const theValues = data.values;

          setProperties(
            theValues.map((element: any) => {
              return (
                <PropertyPreview
                  key={element._id}
                  width={"200px"}
                  height={"250px"}
                  srcUrl={[
                    Helper.getHttpProto() + theValues[0].imgPath + element.src,
                  ]}
                  hrefUrl={element.url}
                  propertyID={"239416201"}
                  bed={element.bed}
                  bath={element.bath}
                  address={element.street}
                  addressBottom={element.city}
                  sqft={element.sqft}
                  price={parseInt(element.price, 10).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                />
              );
            })
          );
        } else {
          console.log(data);
        }
      });
  }, []);

  return (
    <React.Fragment>
      <div className="home">
        <video
          className="backvideo"
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://d3v2utvjzctku0.cloudfront.net/boston.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/*<div className="indev"><span className="indev-text">This website is currently in development. Most images and words are placeholders. Planned launch is January 1st 2021</span></div>*/}
        <div className="searchbar-wrapper">
          <SearchBar default={Tab.BUY} buttons={[Tab.BUY, Tab.RENT]} />
        </div>
        <div className="home-bottom">
          <div className="fl-header">
            <h1>Featured Listings</h1>
            <p>
              Browse some of the hottest listings in Boston and surrounding
              areas!
            </p>
          </div>

          <div className="featured">{properties}</div>

          <span className="home-ourservices">Our Services</span>
          <div className="customBorder"> </div>
          <div className="services">
            <FadeInSection>
              <div className="a">
                <FeaturedListingPhoto
                  width={"240px"}
                  height={"480px"}
                  srcUrl="https://d3v2utvjzctku0.cloudfront.net/1.png"
                  hrefUrl={"https://ygl.is/unionrealtygroup/"}
                  text={
                    <>
                      <b>LEASE</b>
                    </>
                  }
                  external
                />

                <FeaturedListingPhoto
                  width={"240px"}
                  height={"480px"}
                  srcUrl="https://d3v2utvjzctku0.cloudfront.net/2.png"
                  hrefUrl={"/sales"}
                  text={
                    <>
                      <b>BUY</b>
                    </>
                  }
                />
                <FeaturedListingPhoto
                  width={"240px"}
                  height={"480px"}
                  srcUrl="https://d3v2utvjzctku0.cloudfront.net/4.png"
                  hrefUrl={"/sales"}
                  text={
                    <>
                      <b>SELL</b>
                    </>
                  }
                />
                <FeaturedListingPhoto
                  width={"240px"}
                  height={"480px"}
                  srcUrl="https://d3v2utvjzctku0.cloudfront.net/3.png"
                  hrefUrl={"propertymanagement"}
                  text={
                    <>
                      <b>MANAGEMENT</b>
                    </>
                  }
                />
              </div>
            </FadeInSection>

            <div className="contact-cm">
              <ContactManager textGhost={"Type your message here..."} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
