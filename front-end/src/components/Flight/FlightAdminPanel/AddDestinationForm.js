import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { Button } from "@material-ui/core";
import addDestination from "../../../actions/Flight/addDestination";
import { connect } from "react-redux";

class AddDestinationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }

  onHandleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onHandleSubmit = (event) => {
    event.preventDefault();

    this.props.onAddDestination(this.state.title);
    this.props.closeForm();
  };
  render() {
    return (
      <ValidatorForm
        onSubmit={this.onHandleSubmit}
        onError={(error) => console.log(error)}
      >
        <Modal.Header>
          <h2 style={{ "margin-left": "35%" }}>Add Destination</h2>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="auto">
              <TextValidator
                margin="normal"
                label="Destination"
                name="title"
                validators={["required"]}
                value={this.state.title}
                errorMessages={["this field is required"]}
                onChange={(e) => this.onHandleChange(e)}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col md="auto">
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </ValidatorForm>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAddDestination: (title) => dispatch(addDestination(title)),
});

export default connect(null, mapDispatchToProps)(AddDestinationForm);
