import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "date-fns";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { parseStringToDate } from "../Common/Helpers/dateHelper";
import { renderSeats } from "../Common/Helpers/renderSeats";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";
import editAirline from "../../../actions/Flight/editAirline";
import cancelAllFlightOrders from "../../../actions/User/cancelAllFlightOrders";
import { connect } from "react-redux";

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airlineTitle: this.props.airline.Title,
      airlineAddress: this.props.airline.Address,
      airlineDescription: this.props.airline.Description,
      economyDeduction: this.props.airline.Tickets.Economy,
      businessDeduction: this.props.airline.Tickets.Business,
      price: this.props.flight.Price,
      from: this.props.flight.From,
      destination: this.props.flight.To,
      departure: parseStringToDate(this.props.flight.DepartureDate),
      arrival: parseStringToDate(this.props.flight.ArivalDate),
      economyTicket:
        this.props.flight.Price - this.props.airline.Tickets.Economy,
      busiessTicket:
        this.props.flight.Price * 1.05 - this.props.airline.Tickets.Business,
      tripLength: this.props.flight.TripLength,
      seats: this.props.flight.Seats,
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

    var departureDateFormated = format(this.state.departure, "dd/MM/yyyy");
    var arrivalDate = format(this.state.arrival, "dd/MM/yyyy");
    var airline = {
      Id: this.props.airline.Id,
      Title: this.state.airlineTitle,
      Address: this.state.airlineAddress,
      Description: this.state.airlineDescription,
      Tickets: {
        Economy: this.state.economyDeduction,
        Business: this.state.businessDeduction,
      },
      Flight: {
        Id: this.props.flight.Id,
        From: this.state.from,
        To: this.state.destination,
        DepartureDate: departureDateFormated,
        ArivalDate: arrivalDate,
        TripLength: this.state.tripLength,
        Seats: this.state.seats,
        Price: this.state.price,
      },
    };
    this.props.onEditAirline(airline);
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
    this.setState({ [e.target.name]: e.target.value });
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
          <h2 style={{ "margin-left": "35%" }}>Add Passenger Information</h2>
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
                <Tooltip
                  title="Price - Economy Deduction = Economy Ticket Price"
                  interactive
                >
                  <TextValidator
                    margin="normal"
                    label="Economy Deduction"
                    name="economyDeduction"
                    validators={["required", "numbersOnly"]}
                    value={this.state.economyDeduction}
                    errorMessages={[
                      "this field is required",
                      "Only numbers are allowed here",
                    ]}
                    onChange={(e) => this.onHandleChange(e)}
                  />
                </Tooltip>
              </Col>
              <Col md="auto">
                <Tooltip
                  title="Price * 1.05 - Business Deduction = Business Ticket Price"
                  interactive
                >
                  <TextValidator
                    margin="normal"
                    label="Business Deduction"
                    name="businessDeduction"
                    validators={["required", "numbersOnly"]}
                    value={this.state.businessDeduction}
                    errorMessages={[
                      "this field is required",
                      "Only numbers are allowed here",
                    ]}
                    onChange={(e) => this.onHandleChange(e)}
                  />
                </Tooltip>
              </Col>

              <Col md="auto">
                <TextValidator
                  margin="normal"
                  label="Price"
                  name="price"
                  validators={["required", "Only numbers are allowed here"]}
                  value={this.state.price}
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
                  value={this.state.from}
                  errorMessages={["this field is required"]}
                  onChange={(e) => this.onHandleChange(e)}
                />
              </Col>
              <Col md="auto">
                <TextValidator
                  margin="normal"
                  label="Destination"
                  name="destination"
                  validators={["required"]}
                  value={this.state.destination}
                  errorMessages={["this field is required"]}
                  onChange={(e) => this.onHandleChange(e)}
                />
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

const mapDispatchToProps = (dispatch) => ({
  onEditAirline: (airline) => dispatch(editAirline(airline)),
  OnCancelAllOrders: (airlineId, flightId, seatId) =>
    dispatch(cancelAllFlightOrders(airlineId, flightId, seatId)),
});

export default connect(null, mapDispatchToProps)(EditModal);
