import React, { Component } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import ReservationModal from "./ReservationModal";
import { connect } from "react-redux";
import { Collapse } from "react-collapse";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FlightBasicInformation from "./Preview/FlightBasicInformation";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { renderSeats } from "./Common/Helpers/renderSeats";
import reserveSeats from "../../actions/Flight/reserveSeats";
import MultiRef from "react-multi-ref";
import Alert from "react-bootstrap/Alert";

import orderFlight from "../../actions/User/orderFlight";
import { withRouter } from "react-router-dom";
import { getSeatPrice } from "../Flight/Common/Helpers/ticketPriceHelpers";

const modalStyle = { "z-index": "1200" };

class FlightsDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedCollapsed: [],
      openedModal: -1,
      ticketType: 0,
      fastReservationError: -1,
      fastReservationAlreadyFlying: -1,
      fastReservationSuccess: -1,
    };
    this.openClose = this.openClose.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.fastReservationRef = new MultiRef();
  }

  isOpened(index) {
    if (this.state.openedCollapsed.includes(index)) return true;

    return false;
  }

  onHandleTicketTypeChange = (event) => {
    this.setState({ ticketType: event.target.value });
  };

  openClose(event, index) {
    event.preventDefault();
    if (this.state.openedCollapsed.includes(index)) {
      var filteredArray = this.state.openedCollapsed.filter(
        (item) => item !== index
      );

      this.setState({ openedCollapsed: filteredArray });
      return;
    }

    this.setState({
      openedCollapsed: [...this.state.openedCollapsed, index],
    });
  }

  openModal(event, flightId) {
    event.preventDefault();
    if (!this.props.loggedInUser.email) this.props.history.push("/signUp");

    this.setState({ openedModal: flightId });
  }

  closeModal = (event) => {
    this.setState({ openedModal: -1 });
  };

  fastReservation = (event, seats, airline, flight, passengers) => {
    event.preventDefault();
    var foundSeat = false;
    var alreadyFlying = false;
    for (
      var indexOfPassenger = 0;
      indexOfPassenger < passengers.length;
      indexOfPassenger++
    ) {
      if (
        passengers[indexOfPassenger].Email === this.props.loggedInUser.Email
      ) {
        alreadyFlying = flight.Id;
        this.setState({ fastReservationAlreadyFlying: alreadyFlying });
        break;
      }
    }

    if (!alreadyFlying) {
      var numberOfSeat = -1;
      for (var indexOfSeat = 0; indexOfSeat < seats.length; indexOfSeat++) {
        if (seats[indexOfSeat] === -1) {
          numberOfSeat = indexOfSeat;
          seats[indexOfSeat] = 0;
          foundSeat = true;
          break;
        }
      }

      if (foundSeat) {
        const passenger = {
          FirstName: this.props.loggedInUser.FirstName,
          LastName: this.props.loggedInUser.LastName,
          PassportId: this.props.loggedInUser.PassportId,

          TicketType: this.state.ticketType,
          Email: this.props.loggedInUser.Email,
          SeatId: numberOfSeat,
        };

        const order = {
          AirlineId: airline.Id,
          AirlineTitle: airline.Title,
          Destination: flight.To,
          From: flight.From,
          Luggage: airline.Luggage[0],
          DepartureDate: flight.DepartureDate,
          ArrivalDate: flight.ArivalDate,
          TicketType: this.state.ticketType,
          Price: flight.Price * 1.05 - airline.Tickets.Business,
          SeatId: flight.Id,
        };
        this.props.OnFastReservation(
          seats,
          this.props.loggedInUser,
          airline.Id,
          flight.Id
        );

        this.props.OnOrderFlight([order], [passenger]);

        this.setState({ fastReservationSuccess: flight.Id });
      } else {
        this.setState({ fastReservationError: flight.Id });
      }
    }
    setTimeout(() => {
      this.setState({
        fastReservationSuccess: -1,
        fastReservationAlreadyFlying: -1,
        fastReservationError: -1,
      });
    }, 3000);
  };

  render() {
    var airlinesToShow = this.props.airlines;

    if (this.props.filteredAirlines !== -1) {
      airlinesToShow = this.props.filteredAirlines;
    }
    return (
      <div className="flightsTable">
        {airlinesToShow.length > 0 ? (
          <>
            <h2 className="flightsTableTitle">Flights</h2>

            {Array.from(airlinesToShow).map((airline, i) => {
              return (
                <>
                  {airline.flights
                    ? Array.from(airline.flights).map((flight) => {
                        return (
                          <Container fluid className="flightWrap">
                            <Row className="flightPresentRow">
                              <FlightBasicInformation
                                airline={airline}
                                flight={flight}
                              />

                              <Col md="auto" className="flightArrow">
                                <Button
                                  onClick={(e) => this.openClose(e, flight.Id)}
                                >
                                  {this.isOpened(flight.Id) ? (
                                    <KeyboardArrowUpIcon />
                                  ) : (
                                    <KeyboardArrowDownIcon />
                                  )}
                                </Button>
                              </Col>
                            </Row>
                            <Collapse isOpened={this.isOpened(flight.Id)}>
                              <Row className="flightPresentRow">
                                <Col md="auto" className="flightItem">
                                  {this.props.isLoading ? (
                                    <Spinner animation="border" />
                                  ) : (
                                    renderSeats(flight.seats)
                                  )}
                                </Col>

                                <Col md="auto" className="flightItem">
                                  <InputLabel
                                    style={{
                                      "margin-left": "10px",
                                    }}
                                    id="chooseTicketLabel"
                                  >
                                    Ticket / Price
                                  </InputLabel>
                                  <Select
                                    style={{
                                      "margin-left": "10px",
                                      "margin-top": "5px",
                                    }}
                                    labelId="chooseTicketLabel"
                                    onChange={this.onHandleTicketTypeChange}
                                    value={this.state.ticketType}
                                  >
                                    <MenuItem value={0}>
                                      {"Economy" +
                                        " / " +
                                        flight.tickets[1].price}
                                    </MenuItem>
                                    <MenuItem value={1}>
                                      {"Business" +
                                        " / " +
                                        flight.tickets[0].price}
                                    </MenuItem>
                                  </Select>
                                  <br />

                                  {this.props.loggedInUser.FirstName ? (
                                    <Button
                                      ref={this.fastReservationRef.ref(
                                        flight.Id
                                      )}
                                      className="flightReserveButton"
                                      color="primary"
                                      variant="contained"
                                      onClick={(e) =>
                                        this.fastReservation(
                                          e,
                                          flight.Seats,
                                          airline,
                                          flight,
                                          flight.Passengers
                                        )
                                      }
                                    >
                                      Fast Reservation
                                    </Button>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.fastReservationError ===
                                  flight.Id ? (
                                    <Alert variant="warning">
                                      Sorry but this flight doesn't have any
                                      fast reservation seat available, next time
                                      you should be faster
                                    </Alert>
                                  ) : (
                                    ""
                                  )}

                                  {this.state.fastReservationAlreadyFlying ===
                                  flight.Id ? (
                                    <Alert variant="warning">
                                      You are already on this flight
                                    </Alert>
                                  ) : (
                                    ""
                                  )}
                                  {this.state.fastReservationSuccess ===
                                  flight.Id ? (
                                    <Alert variant="success">
                                      You have successfully reserved your flight
                                    </Alert>
                                  ) : (
                                    ""
                                  )}
                                  <br />
                                  <br />
                                  <Button
                                    className="flightReserveButton"
                                    color="primary"
                                    variant="contained"
                                    onClick={(e) =>
                                      this.openModal(e, flight.Id)
                                    }
                                  >
                                    More Info
                                  </Button>

                                  <div className="flightReservationModal">
                                    <Modal
                                      size="lg"
                                      onHide={(e) => this.closeModal(e)}
                                      style={modalStyle}
                                      ariaHideApp={false}
                                      show={
                                        flight.Id === this.state.openedModal
                                          ? true
                                          : false
                                      }
                                      onRequestClose={(e) => this.closeModal(e)}
                                    >
                                      <ReservationModal
                                        airline={airline}
                                        flight={flight}
                                        closeModal={this.closeModal}
                                      />
                                    </Modal>
                                  </div>
                                </Col>
                              </Row>
                            </Collapse>
                          </Container>
                        );
                      })
                    : ""}
                </>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  allAirlines: state.flightReducer.allAirlines,
  airlines: state.flightReducer.airlines,
  loggedInUser: state.userReducer.LoggedInUser,
  filteredAirlines: state.flightReducer.filteredAirlines,
});

const mapDispatchToProps = (dispatch) => ({
  OnFastReservation: (seats, passengers, airlineId, flightId) =>
    dispatch(reserveSeats(seats, passengers, airlineId, flightId)),
  OnOrderFlight: (order, passengers) =>
    dispatch(orderFlight(order, passengers)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FlightsDisplay));
