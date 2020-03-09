import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';

import AppBar from '@material-ui/core/AppBar';


import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  root: {
    flexGrow: 3,

  }
});

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
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
              <Tab label="Home" to={"/"} component={Link} />
              <Tab label="Flight" to={"/flights"} component={Link} />
              <Tab label="Hotel" to={"/hotels"} component={Link} />
              <Tab label="Car" to={"/cars"} component={Link} />
              <IconButton
                ariaLabel="account of current user"
                to={"/account"} component={Link}
              >
                <AccountCircle />
              </IconButton>
              <Tab label="Sign In" to={"/signin"} component={Link} />
              <Tab label="Sign Up" to={"/signup"} component={Link} />
              <IconButton
                ariaLabel="account of current user"
                to={"/account"} component={Link}
              >
                <ShoppingCartIcon />
              </IconButton>
            </Tabs>
          </Paper>
        </AppBar>


      </div>
    );
  }
}

export default Navigation;
