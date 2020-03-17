import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextField from "@material-ui/core/TextField";

class ReservationModal extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col lg={10}>
              <h1 className="myTitle">Reserve Seat</h1>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="auto" className="flightItem">
              <TextField
                label="Company"
                value={this.props.airline.Title}
              ></TextField>
            </Col>
            <Col md="auto" className="flightItem">
              <TextField
                label="From"
                value={this.props.flight.From}
              ></TextField>
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
                value={
                  this.props.flight.Price - this.props.airline.Tickets.Economy
                }
              ></TextField>
            </Col>
            <Col md="auto" className="flightItem">
              <TextField
                label="Business"
                value={
                  this.props.flight.Price -
                  this.props.airline.Tickets.Economy +
                  2
                }
              ></TextField>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ReservationModal;
