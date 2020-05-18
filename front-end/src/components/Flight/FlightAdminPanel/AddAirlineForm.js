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
class AddAirlineForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airlineTitle: "",
      airlineAddress: "",
      airlineDescription: "",
      flightLuggageTypes: [],
      flightDestinations: [],
      luggageFieldEmptyError: false,
      destinationFieldEmptyError: false,
    };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("selectEmpty", (value) => {
      return this.state.flightLuggageTypes.length === 0 ? false : true;
    });
  }
  handleChange = (event) => {
    this.setState({ flightLuggageTypes: event.target.value });

    if (event.target.value.length !== undefined) {
      if (event.target.value.length === 0)
        this.setState({ luggageFieldEmptyError: true });
      else this.setState({ luggageFieldEmptyError: false });
    }
  };

  handleChangeDestinations = (event) => {
    this.setState({ flightDestinations: event.target.value });

    if (event.target.value.length !== undefined) {
      if (event.target.value.length === 0)
        this.setState({ destinationFieldEmptyError: true });
      else this.setState({ destinationFieldEmptyError: false });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.OnAddAirline(
      this.state.airlineTitle,
      this.state.airlineAddress,
      this.state.airlineDescription,
      this.state.flightLuggageTypes,
      this.state.flightDestinations
    );
    this.props.closeForm();
  };

  onHandleChangeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <>
        <Modal.Header>
          <h2 style={{ "margin-left": "35%" }}>Add Airline</h2>
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
                            key={value}
                            label={luggageTypes[value.flightLuggageType]}
                          />
                        ))}
                      </div>
                    )}
                  >
                    {Array.from(this.props.flightLuggage).length === 0 ? (
                      <div />
                    ) : (
                      this.props.flightLuggage.map((luggage) => (
                        <MenuItem
                          key={luggage.flightLuggageType}
                          value={luggage}
                        >
                          <Checkbox
                            checked={
                              this.state.flightLuggageTypes.indexOf(luggage) >
                              -1
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
                              this.state.flightDestinations.indexOf(
                                destination
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
  OnAddAirline: (
    title,
    address,
    description,
    availableLuggages,
    availableDestinations
  ) =>
    dispatch(
      addAirline(
        title,
        address,
        description,
        availableLuggages,
        availableDestinations
      )
    ),
});
export default connect(null, mapDispatchToProps)(AddAirlineForm);
