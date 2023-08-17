import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import PeopleIcon from "@material-ui/icons/People";
import ApartmentIcon from "@material-ui/icons/Apartment";
import HouseIcon from "@material-ui/icons/House";
import BuildIcon from "@material-ui/icons/Build";
import { NavLink } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { useHistory } from "react-router-dom";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "black",
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

type Props = {
  isBackend: boolean;
  agentName: string;
  isAdmin: boolean;
};

const PersistentDrawer = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

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
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            /*style={{ margin: "auto", width: "50%", overflow: "initial" }}*/ variant="h6"
            noWrap
          >
            <NavLink to={"/"}>
              <img
                alt="Union realty group logo"
                className="header-logo"
                src="https://d3v2utvjzctku0.cloudfront.net/logo.png"
              />
            </NavLink>
            {props.isBackend ? (
              <span className="header-icons">
                <Button
                  endIcon={<ArrowDropDownIcon />}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  {props.agentName}
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
                  keepMounted
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
              </span>
            ) : (
              <span className="header-icons-mobile">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/unionrealtyg"
                >
                  <FacebookIcon fontSize={"large"} />
                </a>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.instagram.com/unionrealtygroup/"
                >
                  <InstagramIcon fontSize={"large"} />
                </a>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/company/union-realty-group"
                >
                  <LinkedInIcon fontSize={"large"} />
                </a>
              </span>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        onClick={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Divider />
        {!props.isBackend ?
          <>
            <NavLink to={"/about"}>
              <ListItem button key={"About"}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={"About"} />
              </ListItem>
            </NavLink>
            <NavLink
              to={"#"}
              onClick={() => {
                window.open("https://ygl.is/unionrealtygroup/");
              }}
            >
              <ListItem button key={"Leasing"}>
                <ListItemIcon>
                  <ApartmentIcon />
                </ListItemIcon>
                <ListItemText primary={"Leasing"} />
              </ListItem>
            </NavLink>
            <NavLink to={"/sales"}>
              <ListItem button key={"Sales"}>
                <ListItemIcon>
                  <HouseIcon />
                </ListItemIcon>
                <ListItemText primary={"Sales"} />
              </ListItem>
            </NavLink>
            <Divider />
            <List>
              <NavLink to={"/propertymanagement"}>
                <ListItem button key={"Management"}>
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Management"} />
                </ListItem>
              </NavLink>
              <NavLink to={"/contact"}>
                <ListItem button key={"Contact Us"}>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Contact Us"} />
                </ListItem>
              </NavLink>
              <NavLink to={"/login"}>
                <ListItem button key={"Login"}>
                  <ListItemIcon>
                   
                  </ListItemIcon>
                  <ListItemText primary={"Login"} />
                </ListItem>
              </NavLink>
  

            </List></> : <>  <NavLink to={"/admin/agentlist"}>
              <ListItem button key={"Agents"}>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary={"Agents"} />
              </ListItem>
            </NavLink>
            <NavLink to={"/admin/deallist"}>
              <ListItem button key={"Deals"}>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary={"Deals"} />
              </ListItem>
            </NavLink>
            <NavLink to={"/admin/landlordlist"}>
              <ListItem button key={"Landlords"}>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary={"Landlords"} />
              </ListItem>
            </NavLink>
            <NavLink to={"/admin/changesite"}>
              <ListItem button key={"Edit Website"}>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary={"Edit Website"} />
              </ListItem>
            </NavLink></>}
      </Drawer>
    </div>
  );
};
export default PersistentDrawer;
