import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: -1,
      menuOpened: false
    };
  }
  componentDidMount() {
    var currentValue = -1;

    if (window.location.href === "http://localhost:3000/") currentValue = 0;
    else if (window.location.href.includes("http://localhost:3000/flights"))
      currentValue = 1;
    else if (window.location.href.includes("http://localhost:3000/hotels"))
      currentValue = 2;
    else if (window.location.href.includes("http://localhost:3000/cars"))
      currentValue = 3;

    this.setState({ value: currentValue });
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const classes = this.props;

    return (
      <div className="navigation">
        <AppBar position="static">
          <Paper className={classes.root}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Home" to={"/"} component={Link}></Tab>
              <Tab label="Flight" to={"/flights"} component={Link}></Tab>
              <Tab label="Hotel" to={"/hotels"} component={Link}></Tab>
              <Tab label="Car" to={"/cars"} component={Link}></Tab>

              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <IconButton aria-label="account of current user">
                  <AccountCircle />
                </IconButton>
                {this.props.loggedUser.FirstName
                  ? this.props.loggedUser.FirstName
                  : "Guest"}
              </Button>

              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                {this.props.loggedUser.FirstName ? (
                  <MenuItem onClick={this.handleClose}>
                    <IconButton
                      aria-label="account of current user"
                      to={"/account"}
                      component={Link}
                    >
                      Manage account
                    </IconButton>
                  </MenuItem>
                ) : (
                  <div>
                    <MenuItem onClick={this.handleClose}>
                      <Tab label="Sign In" to={"/signin"} component={Link} />
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                      <Tab label="Sign Up" to={"/signup"} component={Link} />
                    </MenuItem>
                  </div>
                )}
              </Menu>
            </Tabs>
          </Paper>
        </AppBar>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedUser: state.userReducer.LoggedInUser
});
export default connect(mapStateToProps)(Navigation);
