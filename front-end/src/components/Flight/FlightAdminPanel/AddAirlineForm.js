import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
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
  Input,
  FormControl,
  Chip,
  Select,
} from "@material-ui/core";
import { connect } from "react-redux";
import { luggageTypes } from "../../../common/constants";
import addAirline from "../../../actions/Flight/addAirline";
import editAirline from "../../../actions/Flight/editAirline";

class AddAirlineForm extends Component {
  constructor(props) {
    super(props);
    const checkBoxStateMapLuggage = new Map();
    this.state = {
      airlineTitle:
        this.props.airline === undefined ? "" : this.props.airline.title,
      airlineAddress:
        this.props.airline === undefined ? "" : this.props.airline.address,
      airlineDescription:
        this.props.airline === undefined ? "" : this.props.airline.description,
      flightLuggageTypes:
        this.props.airline === undefined
          ? []
          : this.separateFlightLuggageFromAvailableFlightLuggage(
              this.props.airline.availableFlightLuggage
            ),
      flightDestinations:
        this.props.airline === undefined
          ? []
          : this.separateAirlineFromAirlineDestinations(
              this.props.airline.airlineDestinations
            ),
      luggageFieldEmptyError: false,
      destinationFieldEmptyError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("selectEmpty", (value) => {
      return this.state.flightLuggageTypes.length === 0 ? false : true;
    });
  }

  doesArrayHasDuplicate = (array, type) => {
    var foundIndex = -1;
    var retArray = [];
    for (var index = 0; index < array.length - 1; index++) {
      if (
        type === "LUGGAGE" &&
        array[index].flightLuggageId ===
          array[array.length - 1].flightLuggageId &&
        array.length >= 2
      ) {
        foundIndex = index;
        break;
      } else if (
        type === "DESTINATION" &&
        array.length >= 2 &&
        array[index].destinationId === array[array.length - 1].destinationId
      ) {
        foundIndex = index;
        break;
      }
    }

    if (foundIndex !== -1 && type === "LUGGAGE")
      retArray = array.filter(
        (item) => item.flightLuggageId !== array[foundIndex].flightLuggageId
      );
    else if (foundIndex !== -1 && type === "DESTINATION")
      retArray = array.filter(
        (item) => item.destinationId !== array[foundIndex].destinationId
      );
    else retArray = array;

    return retArray;
  };

  handleChange = (event) => {
    var arrayWithoutDuplicate = this.doesArrayHasDuplicate(
      event.target.value,
      "LUGGAGE"
    );
    this.setState({ flightLuggageTypes: arrayWithoutDuplicate });

    if (event.target.value.length !== undefined) {
      if (event.target.value.length === 0)
        this.setState({ luggageFieldEmptyError: true });
      else this.setState({ luggageFieldEmptyError: false });
    }
  };

  separateAirlineFromAirlineDestinations = (array) => {
    var retArray = [];

    Array.from(array).map((item) => {
      var modItem = item.destination;
      retArray.push(modItem);
    });

    return retArray;
  };

  separateFlightLuggageFromAvailableFlightLuggage = (array) => {
    var retArray = [];

    Array.from(array).map((item) => {
      var modItem = item.flightLuggage;
      modItem.availableFlightLuggage = null;
      retArray.push(modItem);
    });
    return retArray;
  };

  handleChangeDestinations = (event) => {
    var arrayWithoutDuplicate = this.doesArrayHasDuplicate(
      event.target.value,
      "DESTINATION"
    );
    this.setState({ flightDestinations: arrayWithoutDuplicate });

    if (event.target.value.length !== undefined) {
      if (event.target.value.length === 0)
        this.setState({ destinationFieldEmptyError: true });
      else this.setState({ destinationFieldEmptyError: false });
    }
  };

  isLuggageChecked = (luggageArray, theLuggage) => {
    for (var index = 0; index < luggageArray.length; index++) {
      if (luggageArray[index].flightLuggageId === theLuggage.flightLuggageId)
        return true;
    }

    return false;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    var availableFlightLuggageArray = [];
    var airlineDestinations = [];
    Array.from(this.state.flightLuggageTypes).map((luggage) => {
      availableFlightLuggageArray.push({
        AirlineId:
          this.props.airline !== undefined ? this.props.airline.airlineId : 0,
        FlightLuggageId: luggage.flightLuggageId,
        FlightLuggage: luggage,
      });
    });

    Array.from(this.state.flightDestinations).map((destination) => {
      airlineDestinations.push({
        AirlineId:
          this.props.airline !== undefined ? this.props.airline.airlineId : 0,
        DestinationId: destination.destinationId,
        Destination: destination,
      });
    });

    var airline = {
      AirlineId:
        this.props.airline !== undefined ? this.props.airline.airlineId : 0,
      Title: this.state.airlineTitle,
      Address: this.state.airlineAddress,
      Description: this.state.airlineDescription,
      AvailableFlightLuggage: availableFlightLuggageArray,
      AirlineDestinations: airlineDestinations,
    };

    this.props.mode === 0
      ? this.props.OnEditAirline(airline)
      : this.props.OnAddAirline(airline);
  };

  isLuggageIncluded(luggageArray, luggage) {
    for (var index = 0; index < luggageArray.length; index++) {
      if (luggageArray[index].flightLuggagId === luggage.flightLuggageId) {
        return true;
      }
    }

    return false;
  }

  onHandleChangeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <>
        <Modal.Header>
          <h2 style={{ "margin-left": "35%" }}>
            {" "}
            {this.props.mode === 0 ? "Edit Airline" : "Add Airline"}
          </h2>
        </Modal.Header>
        <ValidatorForm
          onError={(error) => console.log(error)}
          onSubmit={this.handleSubmit}
        >
          <Modal.Body>
            <Row>
              <Col md="auto">
                <TextValidator
                  margin="normal"
                  label="Airline Title"
                  name="airlineTitle"
                  validators={["required"]}
                  value={this.state.airlineTitle}
                  errorMessages={["this field is required"]}
                  onChange={(e) => this.onHandleChangeText(e)}
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
                  onChange={(e) => this.onHandleChangeText(e)}
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
                    onChange={(e) => this.onHandleChangeText(e)}
                  />
                </div>
              </Col>

              <Col md="auto" style={{ "margin-top": "10px" }}>
                <InputLabel style={{ margin: "0px" }} id="luggageLabel">
                  Luggage types
                </InputLabel>
                <FormControl>
                  <Select
                    multiple
                    style={{ minWidth: "100px", minHeight: "30px" }}
                    labelId="luggageLabel"
                    onChange={this.handleChange}
                    value={this.state.flightLuggageTypes}
                    input={<Input />}
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <Chip
                            key={value.flightLuggageType}
                            label={luggageTypes[value.flightLuggageType]}
                          />
                        ))}
                      </div>
                    )}
                  >
                    {Array.from(this.props.flightLuggage).length === 0 ? (
                      <div />
                    ) : (
                      Array.from(this.props.flightLuggage).map((luggage) => (
                        <MenuItem
                          key={luggage.flightLuggageType}
                          value={luggage}
                        >
                          <Checkbox
                            checked={
                              this.state.flightLuggageTypes.findIndex(
                                (flt) =>
                                  flt.flightLuggageId ===
                                  luggage.flightLuggageId
                              ) > -1
                            }
                          />
                          <ListItemText
                            primary={luggageTypes[luggage.flightLuggageType]}
                          />
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                {this.state.luggageFieldEmptyError ? (
                  <p style={{ color: "red" }}>this field cannot be empty</p>
                ) : (
                  ""
                )}
              </Col>
              <Col md="auto" style={{ "margin-top": "10px" }}>
                <InputLabel style={{ margin: "0px" }} id="destinationsLabel">
                  Destinations
                </InputLabel>
                <FormControl>
                  <Select
                    multiple
                    style={{ minWidth: "100px", minHeight: "30px" }}
                    labelId="destinationsLabel"
                    onChange={this.handleChangeDestinations}
                    value={this.state.flightDestinations}
                    input={<Input />}
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <Chip key={value} label={value.title} />
                        ))}
                      </div>
                    )}
                  >
                    {Array.from(this.props.destinations).length === 0 ? (
                      <div />
                    ) : (
                      this.props.destinations.map((destination) => (
                        <MenuItem
                          key={destination.destinationId}
                          value={destination}
                        >
                          <Checkbox
                            checked={
                              this.state.flightDestinations.findIndex(
                                (fld) =>
                                  fld.destinationId ===
                                  destination.destinationId
                              ) > -1
                            }
                          />
                          <ListItemText primary={destination.title} />
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                {this.state.destinationFieldEmptyError ? (
                  <p style={{ color: "red" }}>this field cannot be empty</p>
                ) : (
                  ""
                )}
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
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  OnAddAirline: (airline) => dispatch(addAirline(airline)),
  OnEditAirline: (airline) => dispatch(editAirline(airline)),
});

export default connect(null, mapDispatchToProps)(AddAirlineForm);
