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
import InviteFriend from "./InviteFriend";
import { connect } from "react-redux";
import getUsers from "../../../actions/User/getUsers";

//const modalStyle = { "z-index": "1200" };

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
      email: "",
      emailError: false,
      selectedFriendEmail: "",
      luggage: 0,
      ticketType: 0,
      currentReservation: 0,
      seatsIds: [],
    };

    this.passportIdField = React.createRef();
    this.nameField = React.createRef();
    this.lastNameField = React.createRef();
    this.inviteFriendRef = React.createRef();
    this.emailField = React.createRef();
  }

  componentDidMount() {
    this.setState({ seatsIds: this.props.seatsIds });
    this.props.getUsers();
  }

  componentDidUpdate() {
    if (
      this.state.currentReservation !== this.props.numOfCompletedReservations
    ) {
      this.setState({
        currentReservation: this.props.numOfCompletedReservations,
      });
    }
  }

  resetFields() {
    this.passportIdField.current.value = "";
    this.nameField.current.value = "";
    this.lastNameField.current.value = "";
    this.emailField.current.value = "";
    // this.state.luggage = 0;
    // this.state.ticketType = 0;
    this.setState({
      ...this.state,
      luggage: 0,
      ticketType: 0,
    });
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

  updateEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onHandleLuggageChange = (event) => {
    this.setState({ luggage: event.target.value });
  };
  onHandleTicketTypeChange = (event) => {
    this.setState({ ticketType: event.target.value });
  };

  submitReservation(passenger, isRequest) {
    passenger.Seat.seatState = 2;
    const order = {
      Flight: this.props.flight,
      FlightTicket:
        this.state.ticketType === 0
          ? this.props.flight.tickets[0]
          : this.props.flight.tickets[1],

      FlightLuggage: { FlightLuggageId: this.state.luggage },
      User: passenger,
      Seat: passenger.Seat,
      Confirmed: isRequest === true ? false : true,
    };

    this.props.reserveSeat(passenger, order);
  }

  getSelectedEmail = (email) => {
    this.setState({ selectedFriendEmail: email });
  };

  inviteFriend = () => {
    var theUser = "";
    Array.from(this.props.allUsers).forEach((user) => {
      if (user.email === this.state.selectedFriendEmail) {
        theUser = user;
      }
    });

    const passenger = {
      FirstName: theUser.firstName,
      LastName: theUser.lastName,
      PassportId: theUser.passportId,
      Luggage: this.state.luggage,
      TicketType: this.state.ticketType,
      Email: theUser.email,
      Seat: Array.from(this.props.flight.seats).find(
        (theSeat) => theSeat.seatState === 0
      ),
    };

    this.inviteFriendRef.current.removeInvitedFriend();
    this.submitReservation(passenger, true);
  };

  onHandleSubmit = (event) => {
    const regexLettersSpaceNumbers = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    const regexLettersOnly = /[^A-Za-z]+/;
    const regexNotANumber = /[^0-9]/;
    const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
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
      if (!regexEmail.test(event.target.value)) {
        this.setState({ emailError: true });
      }
      const passenger = {
        FirstName: this.state.name,
        LastName: this.state.lastName,
        PassportId: this.state.passportId,
        Email: this.state.email,
        Luggage: this.state.luggage,
        TicketType: this.state.ticketType,
        Seat: this.props.seats[this.state.currentReservation],
      };

      this.resetFields();
      this.submitReservation(passenger);
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
                onChange={(event) => this.updateName(event)}
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
                onChange={(event) => this.updateLastName(event)}
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
                onChange={(event) => this.updatePassportID(event)}
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
            <Col md="auto" className="flightItem">
              <TextField
                label="Email"
                onChange={(event) => this.updateEmail(event)}
                inputRef={this.emailField}
              />
            </Col>
            <Overlay
              target={this.emailField}
              show={this.state.emailError}
              placement="bottom"
            >
              <Popover>
                <Popover.Content>
                  <Alert variant="warning">
                    Invalid email please provide a valid one
                  </Alert>
                </Popover.Content>
              </Popover>
            </Overlay>
          </Row>
          <br />

          {this.props.airline.availableFlightLuggage !== undefined ? (
            <Row className="flightPresentRow">
              <Col md="auto" className="flightItem">
                <InputLabel id="luggageLabel">Luggage Type / Price</InputLabel>
                <Select
                  labelId="luggageLabel"
                  onChange={this.onHandleLuggageChange}
                  value={this.state.luggage}
                >
                  {Array.from(this.props.airline.availableFlightLuggage).map(
                    (availableFlightLuggage) => {
                      return (
                        <MenuItem
                          value={
                            availableFlightLuggage.flightLuggage.flightLuggageId
                          }
                        >
                          {availableFlightLuggage.flightLuggage
                            .flightLuggageType === 0
                            ? "Hand / " +
                              availableFlightLuggage.flightLuggage.price
                            : availableFlightLuggage.flightLuggage
                                .flightLuggageType === 1
                            ? "Checked / " +
                              availableFlightLuggage.flightLuggage.price
                            : ""}
                        </MenuItem>
                      );
                    }
                  )}
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
                    {"Economy" + " / " + this.props.flight.tickets[0].price}
                  </MenuItem>
                  <MenuItem value={1}>
                    {"Business" + " / " + this.props.flight.tickets[1].price}
                  </MenuItem>
                </Select>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          {this.props.loggedInUser.firstName ? (
            <div className="mb-2 mr-auto">
              <InviteFriend
                ref={this.inviteFriendRef}
                sendSelectedFriend={(email) => this.getSelectedEmail(email)}
                allUsers={this.props.allUsers}
                friends={this.props.loggedInUser.friendsWith}
                passengers={this.props.flight.Passengers}
              />
              <br />

              <Button
                onMouseDown={this.inviteFriend}
                style={{ "margin-top": "10px" }}
              >
                Invite A Friend
              </Button>
            </div>
          ) : (
            ""
          )}
          <div
            style={
              this.props.loggedInUser.FirstName
                ? { "margin-bottom": "-40px" }
                : { "margin-bottom": "0px" }
            }
          >
            <Button
              onMouseDown={(event) => this.onHandleSubmit(event)}
              variant="contained"
              color="primary"
              style={{ "vertical-align": "text-bottom" }}
            >
              {this.state.currentReservation + 1 ===
              this.props.numOfReservations
                ? "Submit"
                : "Next Passenger"}
            </Button>
            {this.state.currentReservation + 1}/{this.props.numOfReservations}
          </div>
        </Modal.Footer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.userReducer.LoggedInUser,
  allUsers: state.userReducer.AllUsers,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SecondStep);
