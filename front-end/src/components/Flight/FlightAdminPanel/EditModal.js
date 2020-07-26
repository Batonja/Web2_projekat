import React, { Component } from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { renderSeats } from "../Common/Helpers/renderSeats";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import editAirline from "../../../actions/Flight/editAirline";
import cancelAllFlightOrders from "../../../actions/User/cancelAllFlightOrders";
import { connect } from "react-redux";
import addAirline from "../../../actions/Flight/addAirline";

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airlineTitle:
        this.props.airline === undefined ? "" : this.props.airline.title,
      airlineAddress:
        this.props.airline === undefined ? "" : this.props.airline.address,
      airlineDescription:
        this.props.airline === undefined ? "" : this.props.airline.description,

      from:
        this.props.flight === undefined
          ? ""
          : this.props.flight.fromDestination,
      destination:
        this.props.flight === undefined ? "" : this.props.flight.toDestination,
      departure:
        this.props.flight === undefined
          ? new Date()
          : this.props.flight.departureDate,

      arrival:
        this.props.flight === undefined
          ? new Date()
          : this.props.flight.arrivalDate,
      economyTicket:
        this.props.flight.tickets[1] === undefined
          ? ""
          : this.props.flight.tickets[1],
      businessTicket:
        this.props.flight.tickets[0] === undefined
          ? ""
          : this.props.flight.tickets[0],
      tripLength:
        this.props.flight === undefined ? "" : this.props.flight.tripLength,
      seats: this.props.flight === undefined ? "" : this.props.flight.seats,
      mode: this.props.mode,
    };
  }

  componentDidMount() {
    const regexNumber = /^0$|^[1-9]\d*$|^\.\d+$|^0\.\d*$|^[1-9]\d*\.\d*$/;

    ValidatorForm.addValidationRule("numbersOnly", (value) => {
      return regexNumber.test(value) ? true : false;
    });
  }

  onSubmitChanges(event) {
    /*  
              
              airlineToChange.Flights[indexOfFlight].TripLength =
                payload.airline.Flight.TripLength;
              airlineToChange.Flights[indexOfFlight].Seats =
                payload.airline.Flight.Seats;
              airlineToChange.Flights[indexOfFlight].Price =
                payload.airline.Flight.Price; */

    /*var departureDateFormated = format(this.state.departure, "dd/MM/yyyy");
    var arrivalDate = format(this.state.arrival, "dd/MM/yyyy");*/

    var seatObjects = [];

    for (var i = 0; i < this.state.seats.length; i++) {
      var seat = {
        SeatId: i,
        SeatNumber: i,
        SeatState: this.state.seats[i],
      };

      seatObjects.push(seat);
    }

    var airline = {
      Id: this.props.airline.Id,
      Title: this.state.airlineTitle,
      Address: this.state.airlineAddress,
      Description: this.state.airlineDescription,

      Flight: {
        FlightId: this.props.flight.Id,
        FromDestination: this.state.from.title,
        ToDestination: this.state.destination.title,
        DepartureDate: this.state.departure,
        ArrivalDate: this.state.arrival,
        TripLength: this.state.tripLength,
        Tickets: [this.state.businessTicket, this.state.economyTicket],
        Seats: seatObjects,
        Price: this.state.price,
      },
    };

    if (this.state.mode === "EDIT") this.props.onEditAirline(airline);
    else this.props.onAddAirline(airline);
  }

  onAddSeat(event) {
    this.setState({ seats: [...this.state.seats, 1] });
  }
  onRemoveSeat(event) {
    if (this.state.seats[this.state.seats.length - 1] === 2) {
      var seatId = this.state.seats.length - 1;

      this.props.OnCancelAllOrders(
        this.props.airline.Id,
        this.props.flight.Id,
        seatId
      );
    }
    this.setState({
      seats: this.state.seats.slice(0, this.state.seats.length - 1),
    });
  }
  onHandleChange(e) {
    if (e.target.name === "economyPrice")
      this.setState({
        economyTicket: { ...this.state.economyTicket, price: e.target.value },
      });
    else if (e.target.name === "businessPrice")
      this.setState({
        businessTicket: { ...this.state.businessTicket, price: e.target.value },
      });
    else this.setState({ [e.target.name]: e.target.value });
  }

  onHandleDateChange(event, name) {
    if (name === "dateDeparture") {
      this.setState({ departure: event });
    } else {
      this.setState({ arrival: event });
    }
  }

  render() {
    return (
      <>
        <Modal.Header>
          <h2 style={{ "margin-left": "35%" }}>
            {this.state.mode === "EDIT" ? "Edit Flight" : "Add Flight"}
          </h2>
        </Modal.Header>
        <Modal.Body>
          <ValidatorForm>
            <Row>
              <Col md="auto">
                <TextValidator
                  margin="normal"
                  label="Airline Title"
                  name="airlineTitle"
                  validators={["required"]}
                  value={this.state.airlineTitle}
                  errorMessages={["this field is required"]}
                  onChange={(e) => this.onHandleChange(e)}
                />
              </Col>

              <Col md="auto">
                <TextValidator
                  margin="normal"
                  label="Airline's Address"
                  name="airlineAddress"
                  validators={["required"]}
                  value={this.state.airlineAddress}
                  errorMessages={["this field is required"]}
                  onChange={(e) => this.onHandleChange(e)}
                />
              </Col>
              <Col md="auto">
                <div style={{ "margin-top": "12px" }}>
                  <InputLabel htmlFor="airlines-description">
                    Decription
                  </InputLabel>
                  <TextareaAutosize
                    id="airlines-description"
                    label="Description"
                    name="airlineDescription"
                    value={this.state.airlineDescription}
                    onChange={(e) => this.onHandleChange(e)}
                  />
                </div>
              </Col>
              <Col md="auto">
                <TextValidator
                  margin="normal"
                  label="Economy Price"
                  name="economyPrice"
                  validators={["required", "numbersOnly"]}
                  value={this.state.economyTicket.price}
                  errorMessages={[
                    "this field is required",
                    "Only numbers are allowed here",
                  ]}
                  onChange={(e) => this.onHandleChange(e)}
                />
              </Col>
              <Col md="auto">
                <TextValidator
                  margin="normal"
                  label="Business Price"
                  name="businessPrice"
                  validators={["required", "numbersOnly"]}
                  value={this.state.businessTicket.price}
                  errorMessages={[
                    "this field is required",
                    "Only numbers are allowed here",
                  ]}
                  onChange={(e) => this.onHandleChange(e)}
                />
              </Col>

              <Col md="auto">
                <TextValidator
                  margin="normal"
                  label="From"
                  name="from"
                  validators={["required"]}
                  value={this.state.from.title}
                  errorMessages={["this field is required"]}
                  onChange={(e) => this.onHandleChange(e)}
                />
              </Col>
              <Col md="auto">
                <SelectValidator
                  margin="normal"
                  label="Destination"
                  name="destination"
                  validators={["required"]}
                  value={this.state.destination.destinationId}
                  errorMessages={["this field is required"]}
                  onChange={(e) => this.onHandleChange(e)}
                >
                  {Array.from(this.props.airline.airlineDestinations).length ===
                  0 ? (
                    <div />
                  ) : (
                    Array.from(this.props.airline.airlineDestinations).map(
                      (airlineDestination) => (
                        <MenuItem
                          key={airlineDestination.destinationId}
                          value={airlineDestination.destination.destinationId}
                        >
                          {airlineDestination.destination.title}
                        </MenuItem>
                      )
                    )
                  )}
                </SelectValidator>
              </Col>
              <Col md="auto">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    style={{ "margin-top": "15px" }}
                    id="dateDeparture"
                    label="Departure Date"
                    variant="inline"
                    name="departureDate"
                    onChange={(e) =>
                      this.onHandleDateChange(e, "dateDeparture")
                    }
                    format={"dd/MM/yyyy"}
                    value={this.state.departure}
                  />
                </MuiPickersUtilsProvider>
              </Col>
              <Col md="auto">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    style={{ "margin-top": "15px" }}
                    id="arrivalDate"
                    label="Arrival Date"
                    variant="inline"
                    name="arrivalDate"
                    onChange={(e) => this.onHandleDateChange(e, "dateArrival")}
                    format={"dd/MM/yyyy"}
                    value={this.state.arrival}
                  />
                </MuiPickersUtilsProvider>
              </Col>

              <Col md="auto">
                <TextValidator
                  margin="normal"
                  label="Trip Length"
                  name="tripLength"
                  validators={["required", "numbersOnly"]}
                  value={this.state.tripLength}
                  errorMessages={[
                    "this field is required",
                    "Only numbers are allowed",
                  ]}
                  onChange={(e) => this.onHandleChange(e)}
                />
              </Col>
            </Row>
            <Row>
              <Col md="auto">{renderSeats(this.state.seats)}</Col>
            </Row>
          </ValidatorForm>
        </Modal.Body>

        <Modal.Footer>
          <Row>
            <Col md="auto">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => this.onAddSeat(e)}
              >
                Add Seat
              </Button>
            </Col>
            <Col md="auto">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => this.onRemoveSeat(e)}
              >
                Remove Seat
              </Button>
            </Col>
            <Col md="auto">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => this.onSubmitChanges(e)}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  airlines: state.flightReducer.airlines,
});
const mapDispatchToProps = (dispatch) => ({
  onEditAirline: (airline) => dispatch(editAirline(airline)),
  OnCancelAllOrders: (airlineId, flightId, seatId) =>
    dispatch(cancelAllFlightOrders(airlineId, flightId, seatId)),
  onAddAirline: (airline) => dispatch(addAirline(airline)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
