import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Search from "./Search";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

class Flight extends Component {
  render() {
    const classes = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          to="/flights/airlines"
          component={Link}
        >
          Airlines
        </Button>
        <Search />
      </div>
    );
  }
}

export default Flight;
