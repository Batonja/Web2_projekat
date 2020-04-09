/**
 * Code from the below medium post, only updated for latest material UI, using a
 * Menu for the popup and with breakpoints that work.
 *
 * https://medium.com/@habibmahbub/create-appbar-material-ui-responsive-like-bootstrap-1a65e8286d6f
 */
import React from "react";
import { MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import { Menu } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import compose from "recompose/compose";
import logOff from "../../actions/User/logOff";

const styles = (theme) => ({
  account: {
    displey: "flex",
    position: "absolute",
    right: 0,
  },
  buttonBarFlexAccount: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    margin: "0",
    paddingLeft: "16px",
    right: 20,
    position: "relative",
    width: "100%",
    background: "transparent",
  },
  buttonCollapseAccount: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    margin: "0",
    boxShadow: "none",
  },
  toggleDrawer: {},
  linkButtonDiv: {
    margin: "10px",
  },
});

const AccountNavbarCollapse = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { classes } = props;

  return (
    <div className={classes.account}>
      <div className={classes.buttonCollapseAccount}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label="Menu"
          className={classes.toggleDrawer}
        >
          <AccountCircleIcon />
          {props.loggedInUser.FirstName ? props.loggedInUser.FirstName : ""}
        </IconButton>
        <Menu
          id="menu-collapsed"
          anchorEl={anchorEl}
          keepMounted
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} to={"/signIn"} component={RouterLink}>
            Login
          </MenuItem>
          <MenuItem onClick={handleClose} to={"/signUp"} component={RouterLink}>
            Register
          </MenuItem>
        </Menu>
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
          >
            <AccountCircleIcon />
            {props.loggedInUser.FirstName ? props.loggedInUser.FirstName : ""}
          </IconButton>
        </div>
        {!props.loggedInUser.FirstName ? (
          <>
            <div className={classes.linkButtonDiv}>
              <Link
                variant="body2"
                color="inherit"
                to={"/signin"}
                component={RouterLink}
              >
                <div className={classes.linkButtonDiv}>Login</div>
              </Link>
            </div>
            <div className={classes.linkButtonDiv}>
              <Link
                variant="body2"
                color="inherit"
                to={"/signup"}
                component={RouterLink}
              >
                Register
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={classes.linkButtonDiv}>
              <Link
                href=""
                variant="body2"
                color="inherit"
                onClick={props.OnLogOff}
              >
                Logout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedInUser: state.userReducer.LoggedInUser,
});

const mapDispatchToProps = (dispatch) => ({
  OnLoggOff: () => dispatch(logOff),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountNavbarCollapse);
