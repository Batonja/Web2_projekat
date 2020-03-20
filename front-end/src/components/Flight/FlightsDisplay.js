import React, { Component } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import ReservationModal from "./ReservationModal";
import { connect } from "react-redux";
import { Collapse } from "react-collapse";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FlightBasicInformation from "./Preview/FlightBasicInformation";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const modalStyle = { "z-index": "1200" };

class FlightsDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedCollapsed: [],
      openedModal: -1,
      ticketType: 0
    };
    this.openClose = this.openClose.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  isOpened(index) {
    if (this.state.openedCollapsed.includes(index)) return true;

    return false;
  }

  onHandleTicketTypeChange = event => {
    this.setState({ ticketType: event.target.value });
  };

  openClose(event, index) {
    event.preventDefault();
    if (this.state.openedCollapsed.includes(index)) {
      var filteredArray = this.state.openedCollapsed.filter(
        item => item !== index
      );

      this.setState({ openedCollapsed: filteredArray });
      return;
    }

    this.setState({
      openedCollapsed: [...this.state.openedCollapsed, index]
    });
  }

  openModal(event, flightId) {
    event.preventDefault();

    this.setState({ openedModal: flightId });
  }

  closeModal = event => {
    this.setState({ openedModal: -1 });
  };
  render() {
    return (
      <div className="flightsTable">
        <h2 className="flightsTableTitle">Flights</h2>
        {Array.from(this.props.airlines).map((airline, i) => {
          return (
            <>
              {Array.from(airline.Flights).map((flight, flightIndex) => {
                return (
                  <Container fluid className="flightWrap">
                    <Row className="flightPresentRow">
                      <FlightBasicInformation
                        airline={airline}
                        flight={flight}
                      />

                      <Col md="auto" className="flightArrow">
                        <Button onClick={e => this.openClose(e, flight.Id)}>
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
                          {Array.from(
                            new Array(airline.PlaneSeatsNumber[0])
                          ).map((seatsRow, seatsRowId) => {
                            return (
                              <Container className="flightSeats">
                                <Row className="leftSideSeats">
                                  <EventSeatIcon
                                    value={
                                      seatsRowId * airline.PlaneSeatsNumber[1]
                                    }
                                    color={
                                      seatsRowId === 0
                                        ? "disabled"
                                        : flight.Seats[
                                            seatsRowId *
                                              airline.PlaneSeatsNumber[1]
                                          ] === 0
                                        ? "secondary"
                                        : "primary"
                                    }
                                  />
                                  <EventSeatIcon
                                    value={
                                      seatsRowId * airline.PlaneSeatsNumber[1] +
                                      1
                                    }
                                    color={
                                      seatsRowId === 0
                                        ? "disabled"
                                        : flight.Seats[
                                            seatsRowId *
                                              airline.PlaneSeatsNumber[1] +
                                              1
                                          ] === 0
                                        ? "secondary"
                                        : "primary"
                                    }
                                  />
                                  <EventSeatIcon
                                    value={
                                      seatsRowId * airline.PlaneSeatsNumber[1] +
                                      2
                                    }
                                    color={
                                      seatsRowId === 0
                                        ? "disabled"
                                        : flight.Seats[
                                            seatsRowId *
                                              airline.PlaneSeatsNumber[1] +
                                              2
                                          ] === 0
                                        ? "secondary"
                                        : "primary"
                                    }
                                  />
                                </Row>
                                <Row className="rightSideSeats">
                                  <EventSeatIcon
                                    value={
                                      seatsRowId * airline.PlaneSeatsNumber[1] +
                                      3
                                    }
                                    color={
                                      seatsRowId === 0
                                        ? "disabled"
                                        : flight.Seats[
                                            seatsRowId *
                                              airline.PlaneSeatsNumber[1] +
                                              3
                                          ] === 0
                                        ? "secondary"
                                        : "primary"
                                    }
                                  />
                                  <EventSeatIcon
                                    value={
                                      seatsRowId * airline.PlaneSeatsNumber[1] +
                                      4
                                    }
                                    color={
                                      seatsRowId === 0
                                        ? "disabled"
                                        : flight.Seats[
                                            seatsRowId *
                                              airline.PlaneSeatsNumber[1] +
                                              4
                                          ] === 0
                                        ? "secondary"
                                        : "primary"
                                    }
                                  />
                                  <EventSeatIcon
                                    value={
                                      seatsRowId * airline.PlaneSeatsNumber[1] +
                                      5
                                    }
                                    color={
                                      seatsRowId === 0
                                        ? "disabled"
                                        : flight.Seats[
                                            seatsRowId *
                                              airline.PlaneSeatsNumber[1] +
                                              5
                                          ] === 0
                                        ? "secondary"
                                        : "primary"
                                    }
                                  />
                                </Row>
                              </Container>
                            );
                          })}
                        </Col>

                        <Col md="auto" className="flightItem">
                          <InputLabel
                            style={{
                              "margin-left": "10px"
                            }}
                            id="chooseTicketLabel"
                          >
                            Ticket / Price
                          </InputLabel>
                          <Select
                            style={{
                              "margin-left": "10px",
                              "margin-top": "5px"
                            }}
                            labelId="chooseTicketLabel"
                            onChange={this.onHandleTicketTypeChange}
                            value={this.state.ticketType}
                          >
                            <MenuItem value={0}>
                              {"Economy" +
                                " / " +
                                (flight.Price - airline.Tickets.Economy)}{" "}
                            </MenuItem>
                            <MenuItem value={1}>
                              {"Business" +
                                " / " +
                                (flight.Price - airline.Tickets.Business)}
                            </MenuItem>
                          </Select>
                          <br />
                          <Button
                            className="flightReserveButton"
                            color="primary"
                            variant="contained"
                          >
                            Fast Reservation
                          </Button>
                          <br />
                          <br />
                          <Button
                            className="flightReserveButton"
                            color="primary"
                            variant="contained"
                            onClick={e => this.openModal(e, flight.Id)}
                          >
                            More Info
                          </Button>

                          <div className="flightReservationModal">
                            <Modal
                              size="lg"
                              onHide={e => this.closeModal(e)}
                              style={modalStyle}
                              ariaHideApp={false}
                              show={
                                flight.Id === this.state.openedModal
                                  ? true
                                  : false
                              }
                              onRequestClose={e => this.closeModal(e)}
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
              })}
            </>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  airlines: state.flightRed.airlines
});
export default connect(mapStateToProps)(FlightsDisplay);
