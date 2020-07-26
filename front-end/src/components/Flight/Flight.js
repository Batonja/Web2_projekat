import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Search from "./Search";
import FlightsDisplay from "./FlightsDisplay";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Filter from "./Filter";
import { connect } from "react-redux";
import { ROLES } from "../../common/constants";

import getAirlines from "../../actions/Flight/getAirlines";
const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
});

class Flight extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.OnGetAirlines();
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
            {this.props.loggedInUser.Role === ROLES.FLIGHT_ADMIN ? (
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
            ) : (
              ""
            )}
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

const mapStateToProps = (state) => ({
  loggedInUser: state.userReducer.LoggedInUser,
});

const mapDispatchToProps = (dispatch) => ({
  OnGetAirlines: () => dispatch(getAirlines()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Flight));
