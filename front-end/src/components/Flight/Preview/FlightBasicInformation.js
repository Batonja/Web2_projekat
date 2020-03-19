import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import TextField from "@material-ui/core/TextField";

class FlightBasicInformation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
            value={this.props.flight.DepartureDate}
          ></TextField>
        </Col>
        <Col md="auto" className="flightItem">
          <TextField
            label="Economy"
            value={this.props.flight.Price - this.props.airline.Tickets.Economy}
          ></TextField>
        </Col>
        <Col md="auto" className="flightItem">
          <TextField
            label="Business"
            value={
              this.props.flight.Price - this.props.airline.Tickets.Economy + 2
            }
          ></TextField>
        </Col>
      </>
    );
  }
}

export default FlightBasicInformation;
