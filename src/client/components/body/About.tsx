import React, { useState, useEffect } from "react";
import "../../App.css";
import Agents from "../reused/Agents";
import FadeInSection from "../FadeInSection";
import Helper from "../../helpers/helper";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [srvData, setSrvData] = useState(null);

  useEffect(() => {
    fetch("/api/getaboutagents", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setSrvData(
            data.values.map((element: any) => {
              return (
                <Agents
                  imageSrc={
                    Helper.getHttpProto() + data.values[0].imgPath + element.src
                  }
                  text={element.bio}
                  width={"asd"}
                  height={"asd"}
                  agentName={element.name}
                  email={element.email}
                  phone={element.phone}
                  occupation={element.title}
                />
              );
            })
          );
          setIsLoaded(true);
        } else {
        }
      });
  }, []);

  return (
    <div className="about">
      <div style={{ textAlign: "left" }} className="innerComponent">
        <h1 style={{ textAlign: "center" }} className="mini-title">
          MEET OUR TEAM
        </h1>
        <div className="agent-pictures">
          {isLoaded ? srvData : <div style={{ height: "1000px" }}></div>}
        </div>
        <div className="customBorder"> </div>
        <FadeInSection>
          <div className="about-left-right ">
            <div className="aboutus-left">
              <h1 className="mini-title">ABOUT US</h1>
              <h4 className="about-text">
                Union Realty Group is a full-service real estate agency
                servicing Newton, Boston and Greater Boston. Our mission is to
                provide a high quality and personalized service to clients and
                landlords in Residential/Commercial Leasing & Sales, Investments
                and Property Management.
              </h4>
              <br />
              <h1 className="mini-title">MISSION STATEMENT </h1>
              <h4 className="about-text">
                Our mission is not only to make the real estate process
                memorable for our clients and one that our clients want others
                to experience, but we believe a home should be within reach for
                everyone; It takes a dedicated team to make it happen. Our
                approach is designed to use our combined knowledge, experience
                and skills to provide the expertise and service our customers
                and clients require and deserve to achieve their financial and
                real estate goals.
              </h4>
            </div>

            <div className="aboutus-right">
              <h1 className="mini-title">CORE VALUES</h1>
              <h4 className="about-text">
                <span className="letter-biggerer">U</span>-nity: We have fun,
                encourage and celebrate the journey together.
                <br />
                <br />
                <span className="letter-biggerer">N</span>-eighborly: We are
                here to be stewards of our local community as we are nothing
                without their support.
                <br />
                <br />
                <span className="letter-biggerer">I</span>-ntergity. We promise
                to always do the right thing for our team, our business, and our
                clients, resulting in mutual success.
                <br />
                <br />
                <span className="letter-biggerer">O</span>-btainable: We believe
                a home should be within reach for everyone and it takes a
                dedicated team to make it happen
                <br />
                <br />
                <span className="letter-biggerer"> N</span>-urturing: Whether
                it's your precious home for sale, your properties that need to
                be looked after, your office that needs to be leased, or your
                apartment that needs to be rented, we nurture your listings and
                properties that are in our care.
              </h4>
            </div>
          </div>
        </FadeInSection>
        <div className="customBorder"> </div>
        <FadeInSection>
          <div className="aboutus-ourstory">
            <div className="aboutus-left" style={{ width: "100%" }}>
              <h1 className="mini-title">OUR STORY</h1>
              <h4 className="about-text">
                Together we founded Union Realty Group (URG) in 2020, after the
                company where we were both working for was sold. We saw an
                opportunity to unite and build a unique real estate service
                model for homeowners and renters alike. We wish to build bridges
                in our communities by uniting people to communities where they
                want to rent, buy or invest in real estate. <br />
                <br />
                URG is a Full-Service Real Estate Agency servicing Newton,
                Boston and Greater Boston. With over 14 years combined
                experience, networks and skills in the local Boston Real Estate
                Market; we have designed a model to provide an educational
                experience for our clients to achieve their financial and real
                estate goals. <br />
                <br />
                We provide a high quality and personalized service for
                residential, commercial, leasing, sales, investments and
                property management clients, while helping others learn about
                the home searching and home buying process. If needed, we offer
                financial literacy guidance based on your needs for residential
                leasing, home sales or property management. We look forward to
                working with you. <br />
                <br />
                Union Realty Group Partners, <br />
                Jessen Jean Baptiste and Shant Davidian
              </h4>
            </div>
          </div>
        </FadeInSection>

        <img
          style={{
            marginBottom: "30px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "80%",
            marginTop: "25px",
            boxShadow:
              "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
          }}
          src="https://d3v2utvjzctku0.cloudfront.net/shake.jpg"
        />
      </div>
    </div>
  );
};

export default About;
