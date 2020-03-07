import React, { Component } from "react";
import Button from "@material-ui/core/Button";
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
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        to="/airlines"
        component={Link}
      >
        Airlines
      </Button>
    );
  }
}

export default Flight;
