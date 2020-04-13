import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import TextField from "@material-ui/core/TextField";

class FlightBasicInformation extends Component {
  render() {
    var flightHoursSplit = this.props.flight.TripLength.split(".");
    var tripLengthHours = flightHoursSplit[0];
    var tripLengthMinutes =
      flightHoursSplit[1].charAt(0) === 0
        ? flightHoursSplit[1].substring(1)
        : flightHoursSplit[1].concat("0");
    return (
      <>
        <Col md="auto" className="flightItem">
          <TextField
            label="Company"
            value={this.props.airline.Title}
          ></TextField>
        </Col>
        <Col md="auto" className="flightItem">
          <TextField label="From" value={this.props.flight.From}></TextField>
        </Col>
        <Col md="auto" className="flightItem">
          <TextField
            label="Destination"
            value={this.props.flight.To}
          ></TextField>
        </Col>
        <Col md="auto" className="flightItem">
          <TextField
            label="Departure"
            value={this.props.flight.DepartureDate}
          ></TextField>
        </Col>
        <Col md="auto" className="flightItem">
          <TextField
            label="Arrival"
            value={this.props.flight.ArivalDate}
          ></TextField>
        </Col>
        <Col md="auto" className="flightItem">
          <TextField
            label="Economy"
            value={this.props.flight.Price + this.props.airline.Tickets.Economy}
          ></TextField>
        </Col>
        <Col md="auto" className="flightItem">
          <TextField
            label="Business"
            value={
              this.props.flight.Price * 1.05 +
              this.props.airline.Tickets.Business
            }
          ></TextField>
        </Col>
        <Col md="auto" className="flightItem">
          <TextField
            label="Trip Length"
            value={
              (tripLengthHours > 0 ? tripLengthHours + " Hours " : "") +
              tripLengthMinutes +
              " Minutes"
            }
          />
        </Col>
      </>
    );
  }
}

export default FlightBasicInformation;
