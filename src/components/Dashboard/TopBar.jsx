import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "./TopBar.css";
import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

// import firebase from "firebase/app";
// import "firebase/database";
import db from "../../config/firebase";
import { ref, set } from "firebase/database";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const pages = [];
const navItems = ["Logout"];

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function TopBar(props) {
  const settings = [
    props.name,
    props.email,
    <Box
      className="logoutBtn"
      sx={{
        display: { xs: "flex", sm: "flex" },

        // border: 1.5,
        // borderColor: "rgb(200, 204, 203)",
        borderColor: "transparent",
        // boxShadow: "0px 0px 1px black",
        // borderRadius: "4px",
        // background: "rgba( 255, 204, 203, 0.75 )",
        // backdropFilter: "blur ( 4px )",
        // WebkitBackdropFilter: "blur ( 4px )",
      }}
    >
      {navItems.map((item) => (
        <Link
          key={item}
          to="/login"
          style={{
            margin: "auto",
          }}
        >
          <Button
            key={item}
            style={{
              width: "173px",
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {item}
          </Button>
        </Link>
      ))}
    </Box>,
  ];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = async (event) => {
    setIsChecked(!isChecked);
    updateDatabaseRules(isChecked);
  };

  const updateDatabaseRules = (enabled) => {
    // const databaseRef = ref(db,'/.settings/rules');
    if (enabled) {
      props.onChange(enabled);
    } else {
      props.onChange(enabled);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          sx={{
            background: "rgba( 255, 255, 255, 0.64 )",
            // boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 14px )",
            WebkitBackdropFilter: "blur ( 14px )",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
          }}
        >
          <Toolbar>
            <AdbIcon
              sx={{
                display: { xs: "flex", md: "flex" },
                mr: 1,
                color: "black",
              }}
              href="#top"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#top"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "flex" },
                fontFamily: "Candara",
                fontWeight: 700,
                fontSize: 30,
                letterSpacing: ".01rem",
                color: "black",
                textDecoration: "none",
                userSelect: "none",
              }}
            >
              {/* Integrated Wireless Detection System */}
              IWDS
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex" }} />
            <React.Fragment>
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1, transitionDuration: "300ms" }}
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                  label="Sync"
                  style={{ color: "black" }}
                />
              </FormGroup>
            </React.Fragment>
            <Divider />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    boxShadow: "0px 0px 1px",
                    border: 1.5,
                    borderColor: "transparent",
                  }}
                >
                  <Avatar
                    alt=""
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTknCPg5y4ZHiMGpJKFaDP4Id7sQY8OfCNMOw7F-QTMF5rnEpeIH3VXOZzfMU2UsEFrvtA&usqp=CAU"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    className="menuItem"
                    key={setting}
                    onClick={handleCloseUserMenu}
                  >
                    <div style={{ margin: "auto" }}>{setting}</div>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <ScrollTop {...props}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          className="scrollToTop"
        >
          <KeyboardArrowUpIcon
            sx={{
              color: "red",
            }}
          />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
