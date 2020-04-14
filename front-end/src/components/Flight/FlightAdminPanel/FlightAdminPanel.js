import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FlightBasicInformation from "../Preview/FlightBasicInformation";
import { connect } from "react-redux";

class FlightAdminPanel extends Component {
  render() {
    return (
      <div className="flightsTable">
        <h2 className="flightsTableTitle">Panel</h2>
        {Array.from(this.props.airlines).map((airline, index) => {
          {
            Array.from(airline.Flights).map((flight, flightIndex) => {
              return 123;
            });
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  airlines: state.flightReducer.allAirlines,
});

export default connect(mapStateToProps)(FlightAdminPanel);
