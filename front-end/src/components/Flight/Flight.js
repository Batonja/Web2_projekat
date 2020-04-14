import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Search from "./Search";
import FlightsDisplay from "./FlightsDisplay";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Filter from "./Filter";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
});

class Flight extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = this.props;
    return (
      <div>
        <div className="flightTop">
          <div style={{ display: "inline-block" }}>
            <Search />
            <br />
            <Filter />
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              style={{ width: "400px" }}
              to="/flights/admin"
              component={Link}
            >
              Flight Admin Panel
            </Button>
          </div>
          <FlightsDisplay />
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          to="/flights/airlines"
          component={Link}
        >
          Airlines
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Flight);
