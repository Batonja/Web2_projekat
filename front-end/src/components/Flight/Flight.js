import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Search from "./Search";
import FlightsDisplay from "./FlightsDisplay";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  }
});

class Flight extends Component {
  constructor(props) {
    super(props);

    this.myFunction = this.myFunction.bind(this);
  }

  myFunction() {
    alert("Alert");
  }
  render() {
    const classes = this.props;
    return (
      <div>
        <div className="flightTop">
          <Search />
          <FlightsDisplay />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          to="/flights/airlines"
          component={Link}
          onClick={this.myFunction}
        >
          Airlines
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Flight);
