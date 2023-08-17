import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-inner">
        <div className="footerSegment">
          <p className="footer-title mobileFix">Union Realty Group</p>
          <span>
            Sales, Leasing, and Property Management for Newton, Boston, and
            Greater Boston.
            <br />

            <br />
            <span>FOLLOW OUR SOCIAL MEDIA!</span>
          </span>
          <br />
          <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/unionrealtyg">
            <FacebookIcon />
          </a>
          <a rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/unionrealtygroup/">
            <InstagramIcon />
          </a>
          <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/company/union-realty-group">
            <  LinkedInIcon />
          </a>

        </div>
        <div className="footerSegment">
          <p className="footer-title">Location</p>
          <span>109 Elm Street <br /> Newton, MA 02465</span>
        </div>
        <div className="footerSegment">
          <p>Contact Us</p>
          <span>
            (617) 531-9086
            <br />
            Info@UnionRG.com

          </span>
        </div>

        <div className="footerSegment">
          <p className="footer-title">Navigate</p>

          <span>
            <NavLink to="/">HOME</NavLink>
          </span>
          <br />
          <span>
            <NavLink to="/about">ABOUT</NavLink>
          </span>
          <br />
          <span>
            <a rel="noopener noreferrer" href="https://ygl.is/unionrealtygroup/" target="_blank" > LEASING </a>
            {/*<NavLink to="/leasing">LEASING </NavLink>*/}
          </span>
          <br />
          <span>
            <NavLink to="/sales">SALES</NavLink>
          </span>
          <br />
          <span>
            <NavLink to="/propertymanagement">PROPERTY MANAGEMENT</NavLink>
          </span>
          <br />
          <span>
            <NavLink to="/careers">CAREERS</NavLink>
          </span>
        </div>

      </div>
      <div className="custom-footer">Website Created by  <a href="https://www.linkedin.com/in/shaunt-keshishian-045450195/">Shaunt Keshishian</a></div>
    </div>
  );
};

export default Footer;
