/**
 * Code from the below medium post, only updated for latest material UI, using a
 * Menu for the popup and with breakpoints that work.
 *
 * https://medium.com/@habibmahbub/create-appbar-material-ui-responsive-like-bootstrap-1a65e8286d6f
 */
import React from "react";
//import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import DrowerNavbarCollapsed from "./DrowerNavbarCollapsed";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = (theme) => ({
  menu: {
    displey: "flex",
    position: "absolute",
    left: 40,
  },
  buttonBarFlexAccount: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    margin: "0",
    paddingLeft: "16px",
    right: 0,
    position: "relative",
    width: "100%",
    background: "transparent",
  },

  buttonCollapseMenu: {
    flexGrow: "1",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    margin: "0",
    boxShadow: "none",
  },
  toggleDrawer: {},

  linkButtonDiv: {
    displey: "flex",
    // position: 'absolute',
    margin: "20px",
    border: "2px solid white",
    borderRadius: "20px",
    width: "120px",
    //bottom: "0",
    //height: '50px',
    alignItems: "center",
    textAlign: "center",
  },
});

const MenuNavbarCollapse = (props) => {
  const { classes } = props;

  return (
    <div className={classes.menu}>
      <div className={classes.buttonCollapseMenu}>
        <DrowerNavbarCollapsed />
      </div>

      <div
        className={classes.buttonBarFlexAccount}
        id="menu-uncollapsed-account"
      >
        <div>
          <IconButton
            color="inherit"
            aria-label="Menu"
            className={classes.toggleDrawer}
            to={"/"}
            component={RouterLink}
          >
            <HomeIcon />
          </IconButton>
        </div>
        <div>
          <Link
            variant="body2"
            color="inherit"
            to={"/flights"}
            component={RouterLink}
            style={{ margin: "20px", itemAlign: "center" }}
          >
            <div className={classes.linkButtonDiv}>Airlines</div>
          </Link>
        </div>
        <div>
          <Link
            variant="body2"
            color="inherit"
            to={"/cars"}
            component={RouterLink}
            style={{ margin: "20px", itemAlign: "center" }}
          >
            <div className={classes.linkButtonDiv}>Rent A Car</div>
          </Link>
        </div>
        <div>
          <Link
            variant="body2"
            color="inherit"
            to={"/carsadminhome"}
            component={RouterLink}
            style={{ margin: "20px", itemAlign: "center" }}
          >
            <div className={classes.linkButtonDiv}>Admin</div>
          </Link>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
        transition={Zoom}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default withStyles(styles)(MenuNavbarCollapse);
