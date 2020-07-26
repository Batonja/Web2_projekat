import React, { Component } from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import {
  MenuItem,
  Button,
  InputLabel,
  TextareaAutosize,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import { luggageTypes } from "../../../common/constants";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import addFlight from "../../../actions/Flight/addFlight";

class AddFlightForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAirline: "",
      selectedToDestination: "",
      selectedFromDestination: "",
      arrivalDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      ),
      departureDate: new Date(),
      dateError: false,
      tripLength: "",
      priceEconomy: "",
      priceBusiness: "",
      numOfChangeOvers: "",
      numOfSeats: "",
    };
  }

  componentDidMount() {
    const regexNumber = /^0$|^[1-9]\d*$|^\.\d+$|^0\.\d*$|^[1-9]\d*\.\d*$/;
    const regexNotANumber = /[^0-9]/;
    ValidatorForm.addValidationRule("toAndFromSame", (value) => {
      return this.state.selectedToDestination ===
        this.state.selectedFromDestination
        ? false
        : true;
    });

    ValidatorForm.addValidationRule("numbersOnly", (value) => {
      return regexNumber.test(value) ? true : false;
    });

    ValidatorForm.addValidationRule("wholeNumbersOnly", (value) => {
      return regexNotANumber.test(value) ? false : true;
    });
  }

  onHandleDateChange = (event, name) => {
    if (name.includes("Arrival")) {
      this.setState({
        arrivalDate: event,
        dateError: event < this.state.departureDate ? true : false,
      });
    }
    if (name.includes("Departure")) {
      this.setState({
        departureDate: event,
        dateError: event > this.state.arrivalDate ? true : false,
      });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitChanges = (event) => {
    if (this.state.dateError) return;

    var seats = [];

    for (
      let indexOfSeat = 0;
      indexOfSeat < this.state.numOfSeats;
      indexOfSeat++
    ) {
      var seat = {
        SeatNumber: indexOfSeat + 1,
        SeatState: indexOfSeat < 5 ? -1 : 1,
      };
      seats.push(seat);
    }
    var tickets = [];

    var businessTicket = { Type: 0, Price: this.state.priceBusiness };
    var economyTicket = { Type: 1, Price: this.state.priceEconomy };
    tickets.push(businessTicket, economyTicket);
    var Flight = {
      ToDestination: this.state.selectedToDestination,

      fromDestination: this.state.selectedFromDestination,
      DepartureDate: new Date(this.state.departureDate),
      ArrivalDate: new Date(this.state.arrivalDate),
      TripLength: this.state.tripLength,
      Price: this.state.price,
      NumOfChangeovers: this.state.numOfChangeOvers,
      Airline: this.state.selectedAirline,
      Tickets: tickets,
    };

    this.props.onAddFlight(Flight);
    this.props.closeForm();
  };
  render() {
    return (
      <ValidatorForm onSubmit={this.onSubmitChanges}>
        <Modal.Header>
          <h2 style={{ "margin-left": "35%" }}>Add Flight</h2>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="auto" style={{ "margin-top": "10px" }}>
              <InputLabel style={{ margin: "0px" }} id="airlineLabelId">
                Airlines
              </InputLabel>

              <SelectValidator
                validators={["required"]}
                errorMessages={["You have to select one airline company"]}
                labelId="airlineLabelId"
                style={{ "min-width": "100px" }}
                onChange={this.handleChange}
                value={this.state.selectedAirline}
                name="selectedAirline"
              >
                {Array.from(this.props.airlines).length === 0 ? (
                  <div />
                ) : (
                  this.props.airlines.map((airline) => (
                    <MenuItem key={airline.airlineId} value={airline}>
                      {airline.title}
                    </MenuItem>
                  ))
                )}
              </SelectValidator>
            </Col>
            <Col md="auto" style={{ "margin-top": "10px" }}>
              <InputLabel style={{ margin: "0px" }} id="toDestinationLabel">
                To Destination
              </InputLabel>

              <SelectValidator
                validators={["required", "toAndFromSame"]}
                errorMessages={[
                  "You have to select one destination",
                  "To and from destinations cannot be the same",
                ]}
                style={{ minWidth: "100px" }}
                labelId="toDestinationLabel"
                onChange={this.handleChange}
                value={this.state.selectedToDestination}
                name="selectedToDestination"
              >
                {Array.from(this.props.destinations).length === 0 ? (
                  <div />
                ) : (
                  this.props.destinations.map((destination) => (
                    <MenuItem
                      key={destination.destinationId}
                      value={destination}
                    >
                      {destination.title}
                    </MenuItem>
                  ))
                )}
              </SelectValidator>
            </Col>
            <Col md="auto" style={{ "margin-top": "10px" }}>
              <InputLabel style={{ margin: "0px" }} id="fromDestinationLabel">
                From Destination
              </InputLabel>

              <SelectValidator
                validators={["required", "toAndFromSame"]}
                errorMessages={[
                  "You have to select one destination",
                  "To and from destinations cannot be the same",
                ]}
                style={{ minWidth: "100px" }}
                labelId="fromDestinationLabel"
                onChange={this.handleChange}
                value={this.state.selectedFromDestination}
                name="selectedFromDestination"
              >
                {Array.from(this.props.destinations).length === 0 ? (
                  <div />
                ) : (
                  this.props.destinations.map((destination) => (
                    <MenuItem
                      key={destination.destinationId}
                      value={destination}
                    >
                      {destination.title}
                    </MenuItem>
                  ))
                )}
              </SelectValidator>
            </Col>
            <Col md="auto" style={{ "margin-top": "10px" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  id="dateArrival"
                  name="departureDate"
                  label="Departure Date"
                  variant="inline"
                  format={"dd/MM/yyyy"}
                  onChange={(e) => this.onHandleDateChange(e, "dateDeparture")}
                  value={this.state.departureDate}
                />
              </MuiPickersUtilsProvider>
              {this.state.dateError ? (
                <p style={{ color: "red" }}>
                  Departure date must be before arrival date
                </p>
              ) : (
                ""
              )}
            </Col>
            <Col md="auto" style={{ "margin-top": "10px" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  id="dateArrival"
                  name="arrivalDate"
                  label="Arrival Date"
                  variant="inline"
                  format={"dd/MM/yyyy"}
                  onChange={(e) => this.onHandleDateChange(e, "dateArrival")}
                  value={this.state.arrivalDate}
                />
              </MuiPickersUtilsProvider>
              {this.state.dateError ? (
                <p style={{ color: "red" }}>
                  Arrival date must be after departure date
                </p>
              ) : (
                ""
              )}
            </Col>

            <Col md="auto" style={{ "margin-top": "-5px" }}>
              <TextValidator
                margin="normal"
                label="Trip Length"
                name="tripLength"
                validators={["required", "numbersOnly"]}
                value={this.state.tripLength}
                errorMessages={[
                  "this field is required",
                  "Trip length must be a number",
                ]}
                onChange={this.handleChange}
              />
            </Col>

            <Col md="auto" style={{ "margin-top": "-5px" }}>
              <TextValidator
                margin="normal"
                label="Price Economy"
                name="priceEconomy"
                validators={["required", "numbersOnly"]}
                value={this.state.priceEconomy}
                errorMessages={[
                  "this field is required",
                  "Price must be a number",
                ]}
                onChange={this.handleChange}
              />
            </Col>
            <Col md="auto" style={{ "margin-top": "-5px" }}>
              <TextValidator
                margin="normal"
                label="Price Business"
                name="priceBusiness"
                validators={["required", "numbersOnly"]}
                value={this.state.priceBusiness}
                errorMessages={[
                  "this field is required",
                  "Price must be a number",
                ]}
                onChange={this.handleChange}
              />
            </Col>
            <Col md="auto" style={{ "margin-top": "-5px" }}>
              <TextValidator
                margin="normal"
                label="Number Of Changeovers"
                name="numOfChangeOvers"
                validators={["required", "wholeNumbersOnly"]}
                value={this.state.numOfChangeOvers}
                errorMessages={[
                  "this field is required",
                  "Number of changeovers must be a whole number",
                ]}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col md="auto">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </ValidatorForm>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAddFlight: (flight) => dispatch(addFlight(flight)),
});

export default connect(null, mapDispatchToProps)(AddFlightForm);
