import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import Alert from "react-bootstrap/Alert";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

class SecondStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      passportId: 0,
      passportIdError: false,
      nameError: false,
      lastNameError: false,
      luggage: 0,
      ticketType: 0
    };

    this.passportIdField = React.createRef();
    this.nameField = React.createRef();
    this.lastNameField = React.createRef();
  }

  updateName(event) {
    this.setState({ name: event.target.value, nameError: false });
  }
  updateLastName(event) {
    this.setState({ lastName: event.target.value, lastNameError: false });
  }

  updatePassportID(event) {
    var regexNumbersOnly = /^[0-9]*$/;

    if (!regexNumbersOnly.test(event.target.value)) {
      this.setState({ passportIdError: true });
      return;
    }

    this.setState({ passportId: event.target.value, passportIdError: false });
  }
  onHandleLuggageChange = event => {
    this.setState({ luggage: event.target.value });
  };
  onHandleTicketTypeChange = event => {
    this.setState({ ticketType: event.target.value });
  };

  onHandleSubmit = event => {
    if (event.button === 0) {
      if (this.state.name === "") {
        this.setState({ nameError: true });
        return;
      }
      if (this.state.lastName === "") {
        this.setState({ lastNameError: true });
        return;
      }
      if (this.state.passportId === 0) {
        this.setState({ passportIdError: true });
        return;
      }
    }
  };
  render() {
    return (
      <>
        <Modal.Header>
          <h2 style={{ "margin-left": "35%" }}>Add Passenger Information</h2>
        </Modal.Header>
        <Modal.Body>
          <Row className="flightPresentRow">
            <Col md="auto" className="flightItem">
              <TextField
                ref={this.nameField}
                label="Name"
                onChange={event => this.updateName(event)}
              />
            </Col>
            <Overlay
              target={this.nameField}
              show={this.state.nameError}
              placement="bottom"
            >
              <Popover>
                <Popover.Content>
                  <Alert variant="warning">
                    Invalid name please provide valid one
                  </Alert>
                </Popover.Content>
              </Popover>
            </Overlay>

            <Col md="auto" className="flightItem">
              <TextField
                ref={this.lastNameField}
                label="Lastname"
                onChange={event => this.updateLastName(event)}
              />
            </Col>
            <Overlay
              target={this.lastNameField}
              show={this.state.lastNameError}
              placement="bottom"
            >
              <Popover>
                <Popover.Content>
                  <Alert variant="warning">
                    Invalid lastName please provide valid one
                  </Alert>
                </Popover.Content>
              </Popover>
            </Overlay>
            <Col md="auto" className="flightItem">
              <TextField
                ref={this.passportIdField}
                label="Passport ID"
                onChange={event => this.updatePassportID(event)}
              />

              <Overlay
                target={this.passportIdField}
                show={this.state.passportIdError}
                placement="bottom"
              >
                <Popover>
                  <Popover.Content>
                    <Alert variant="warning">
                      Invalid passport id please provide a valid one
                    </Alert>
                  </Popover.Content>
                </Popover>
              </Overlay>
            </Col>
          </Row>
          <br />
          <Row className="flightPresentRow">
            <Col md="auto" className="flightItem">
              <InputLabel id="luggageLabel">Luggage Type / Price</InputLabel>
              <Select
                labelId="luggageLabel"
                onChange={this.onHandleLuggageChange}
                value={this.state.luggage}
              >
                <MenuItem value={0}>
                  {this.props.airline.Luggage[0].Type.toString() +
                    " / " +
                    this.props.airline.Luggage[0].Price.toString()}
                </MenuItem>
                <MenuItem value={1}>
                  {this.props.airline.Luggage[1].Type.toString() +
                    " / " +
                    this.props.airline.Luggage[1].Price.toString()}
                </MenuItem>
              </Select>
            </Col>
            <Col md="auto" className="flightItem">
              <InputLabel id="chooseTicketLabel">Ticket / Price</InputLabel>
              <Select
                labelId="chooseTicketLabel"
                onChange={this.onHandleTicketTypeChange}
                value={this.state.ticketType}
              >
                <MenuItem value={0}>
                  {"Economy" +
                    " / " +
                    (this.props.flight.Price +
                      this.props.airline.Tickets.Economy)}{" "}
                </MenuItem>
                <MenuItem value={1}>
                  {"Business" +
                    " / " +
                    (this.props.flight.Price * 1.05 +
                      this.props.airline.Tickets.Business)}
                </MenuItem>
              </Select>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onMouseDown={event => this.onHandleSubmit(event)}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <br />
          <Button variant="contained" color="primary">
            Invite Friend
          </Button>
        </Modal.Footer>
      </>
    );
  }
}

export default SecondStep;
