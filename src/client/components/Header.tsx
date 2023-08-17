import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PersistenDrawer from "./PersistentDrawer";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

type Props = {
  isBackend: boolean;
};

const Header = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    if (props.isBackend) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(`/api/admincheck`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        });



      fetch("/api/getcurrentuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            const theValues = data.values[0];

            setName(theValues.name);

          }
        });
    };

  }, []);




  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (location: string) => {
    history.push(location);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <div className="mobile-header">
        <PersistenDrawer isAdmin={isAdmin} agentName={name} isBackend={props.isBackend} />
      </div>
      <ul className="nav">
        <li className="header-home-li">
          <NavLink className="header-home" to="/">
            <img
              alt="Union realty group logo"
              className="header-logo"
              src="https://d3v2utvjzctku0.cloudfront.net/logo.png"
            />
          </NavLink>
        </li>
        {props.isBackend ? (
          <>
            {isAdmin ? (
              <li className="nav-center">
                <NavLink to="/admin/agentlist">Agents </NavLink>
                <div className="header-bottom-border"></div>
              </li>) : <></>}
            <li className="nav-center">
              <NavLink to="/admin/deallist">Deals </NavLink>
              <div className="header-bottom-border"></div>
            </li>
            <li className="nav-center">
              <NavLink to="/admin/landlordlist">Landlords </NavLink>
              <div className="header-bottom-border"></div>
            </li>
            {isAdmin ? (
              <li className="nav-center">
                <NavLink to="/admin/changesite">Edit Website </NavLink>
                <div className="header-bottom-border"></div>
              </li>) : <></>}
            <li style={{ marginRight: "200px" }} className="header-icons">
              <Button
                endIcon={<ArrowDropDownIcon />}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {name}
              </Button>
              <Menu
                style={{ marginTop: "40px" }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                disableScrollLock={true}
                id="simple-menu"
                anchorEl={anchorEl}

                open={Boolean(anchorEl)}
                onClose={handleClose}
              >


                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    document.location.href = "/login/";
                  }}
                >
                  Logout
              </MenuItem>
              </Menu>
            </li>

          </>
        ) : (
          <>
            <li className="nav-center hidden-home">
              <NavLink to="/">HOME </NavLink>
              <div className="header-bottom-border"></div>
            </li>
            <li className="nav-center">
              <NavLink to="/about">ABOUT </NavLink>
              <div className="header-bottom-border"></div>
            </li>
            <li className="nav-center">
              <a
                rel="noopener noreferrer"
                href="https://ygl.is/unionrealtygroup/"
                target="_blank"
              >
                LEASING
          </a>
              <div className="header-bottom-border"></div>
              {/*<NavLink to="/leasing">LEASING </NavLink><div className="header-bottom-border"></div>*/}
            </li>
            <li className="nav-center">
              <NavLink to="/sales">SALES </NavLink>
              <div className="header-bottom-border"></div>
            </li>
            <li className="nav-center">
              <NavLink to="/propertymanagement">PROPERTY MANAGMENT </NavLink>
              <div className="header-bottom-border"></div>
            </li>
            <li className="nav-center">
              <NavLink to="/contact">CONTACT </NavLink>
              <div className="header-bottom-border"></div>
            </li>
            <li className="nav-center">
              <NavLink  to="/login"><span style = {{color:"red"}}>LOGIN</span> </NavLink>
              <div className="header-bottom-border"></div>
            </li>

            <li className="header-icons">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.facebook.com/unionrealtyg"
              >
                <FacebookIcon color={"inherit"} />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.instagram.com/unionrealtygroup/"
              >
                <InstagramIcon color={"inherit"} />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/company/union-realty-group"
              >
                <LinkedInIcon />
              </a>
            </li>
          </>
        )}
      </ul>
    </React.Fragment>
  );
};

export default Header;
