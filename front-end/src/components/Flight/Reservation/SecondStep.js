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
import InviteFriend from "./InviteFriend"
import { connect } from "react-redux";

const modalStyle = { "z-index": "1200" };

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
      openInviteFriend:false,
      luggage: 0,
      ticketType: 0,
      currentReservation: 0
    };

    this.passportIdField = React.createRef();
    this.nameField = React.createRef();
    this.lastNameField = React.createRef();
  }

  componentDidUpdate() {
    if (
      this.state.currentReservation != this.props.numOfCompletedReservations
    ) {
      this.setState({
        currentReservation: this.props.numOfCompletedReservations
      });
    }
  }

  resetFields() {
    this.passportIdField.current.value = "";
    this.nameField.current.value = "";
    this.lastNameField.current.value = "";
    this.state.luggage = 0;
    this.state.ticketType = 0;
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
  openInviteFriend = () => {
    this.setState({openInviteFriend:true})
  }

  closeInviteFriend = () => {
    this.setState({openInviteFriend:false})
  }

  onHandleSubmit = event => {
    const regexLettersSpaceNumbers = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    const regexLettersOnly = /[^A-Za-z]+/;
    const regexNotANumber = /[^0-9]/;
    if (event.button === 0) {
      if (
        this.state.name === "" ||
        !regexLettersSpaceNumbers.test(this.state.name)
      ) {
        this.setState({ nameError: true });
        return;
      }
      if (
        this.state.lastName === "" ||
        regexLettersOnly.test(this.state.lastName)
      ) {
        this.setState({ lastNameError: true });
        return;
      }
      if (
        this.state.passportId === 0 ||
        regexNotANumber.test(this.state.passportId)
      ) {
        this.setState({ passportIdError: true });
        return;
      }

      const passenger = {
        Name: this.state.name,
        LastName: this.state.lastName,
        PassportId: this.state.passportId,
        Luggage: this.state.luggage,
        TicketType: this.state.ticketType
      };

      this.resetFields();
      this.props.reserveSeat(
        this.props.numOfReservations,
        this.state.currentReservation
      );
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
                inputRef={this.nameField}
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
                    Only letters, spaces and numbers are allowed, please provide
                    valid name
                  </Alert>
                </Popover.Content>
              </Popover>
            </Overlay>

            <Col md="auto" className="flightItem">
              <TextField
                inputRef={this.lastNameField}
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
                inputRef={this.passportIdField}
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
          {this.props.loggedInUser.FirstName ?  <Button onMouseDown={ this.openInviteFriend} variant="contained" color="primary" className="mb-2 mr-auto">
            Invite A Friend
          </Button> : "" }
          
            <Modal onHide={this.closeInviteFriend} style={modalStyle} ariaHideApp={false} show={this.state.openInviteFriend}>
                    <InviteFriend friends={this.props.loggedInUser.friends}/>

              </Modal>          
          <Button
            onMouseDown={event => this.onHandleSubmit(event)}
            variant="contained"
            color="primary"
            className="mb-2"
          >
            {this.state.currentReservation + 1 === this.props.numOfReservations
              ? "Submit"
              : "Next Passenger"}
          </Button>

          <div>
            {this.state.currentReservation + 1}/{this.props.numOfReservations}
          </div>
        </Modal.Footer>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser:state.userReducer.LoggedInUser
})

export default connect(mapStateToProps)(SecondStep);
