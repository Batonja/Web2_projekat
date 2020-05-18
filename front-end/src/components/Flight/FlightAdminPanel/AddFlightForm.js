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

class AddFlightForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAirline: "",
    };
  }

  handleChange = (event) => {
    this.setState({ selectedAirline: event.target.value });
  };

  onSubmitChanges = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <>
        <Modal.Header>
          <h2 style={{ "margin-left": "35%" }}>Add Flight</h2>
        </Modal.Header>
        <Modal.Body>
          <ValidatorForm>
            <Row>
              <Col md="auto" style={{ "margin-top": "10px" }}>
                <InputLabel style={{ margin: "0px" }} id="luggageLabel">
                  Airlines
                </InputLabel>

                <SelectValidator
                  validators={["disciplineSelected"]}
                  errorMessages={["Please select discipline you want to coach"]}
                  style={{ minWidth: "100px" }}
                  labelId="disciplineLabelId"
                  style={{ width: "200px", height: "200px" }}
                  onChange={this.handleChange}
                  value={this.state.selectedAirline}
                  name="selectedDiscipline"
                >
                  {Array.from(this.props.airlines).length === 0 ? (
                    <div />
                  ) : (
                    this.props.airlines.map((airline) => (
                      <MenuItem
                        key={airline.airlineId}
                        value={airline.airlineId}
                      >
                        {airline.title}
                      </MenuItem>
                    ))
                  )}
                </SelectValidator>
              </Col>
            </Row>
          </ValidatorForm>
        </Modal.Body>
        <Modal.Footer>
          <Row>
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
        )}
      </>
    );
  }
}

export default AddFlightForm;
