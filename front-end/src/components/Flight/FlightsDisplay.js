import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import ReservationModal from "./ReservationModal";
import { connect } from "react-redux";
import { Collapse } from "react-collapse";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import Modal from "react-modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const modalStyle = { content: { inset: "110px", "margin-left": "12%" } };

class FlightsDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedCollapsed: [],
      luggage: 0,
      openedModal: -1
    };
    this.openClose = this.openClose.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  isOpened(index) {
    if (this.state.openedCollapsed.includes(index)) return true;

    return false;
  }
  onHandleLuggageChange = event => {
    this.setState({ luggage: event.target.value });
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

  openModal(flightId) {
    this.setState({ openedModal: flightId });
  }

  closeModal() {
    this.setState({ openedModal: -1 });
  }
  render() {
    return (
      <div className="flightsTable">
        <h2 className="flightsTableTitle">Flights</h2>
        {Array.from(this.props.airlines).map((airline, i) => {
          return (
            <div>
              {Array.from(airline.Flights).map((flight, flightIndex) => {
                return (
                  <Container fluid className="flightWrap">
                    <Row className="flightPresentRow">
                      <Col md="auto" className="flightItem">
                        <TextField
                          label="Company"
                          value={airline.Title}
                        ></TextField>
                      </Col>
                      <Col md="auto" className="flightItem">
                        <TextField label="From" value={flight.From}></TextField>
                      </Col>
                      <Col md="auto" className="flightItem">
                        <TextField
                          label="Destination"
                          value={flight.To}
                        ></TextField>
                      </Col>
                      <Col md="auto" className="flightItem">
                        <TextField
                          label="Departure"
                          value={flight.DepartureDate}
                        ></TextField>
                      </Col>
                      <Col md="auto" className="flightItem">
                        <TextField
                          label="Arrival"
                          value={flight.DepartureDate}
                        ></TextField>
                      </Col>
                      <Col md="auto" className="flightItem">
                        <TextField
                          label="Economy"
                          value={flight.Price - airline.Tickets.Economy}
                        ></TextField>
                      </Col>
                      <Col md="auto" className="flightItem">
                        <TextField
                          label="Business"
                          value={flight.Price - airline.Tickets.Economy + 2}
                        ></TextField>
                      </Col>
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
                      <div>
                        <Row className="flightPresentRow">
                          <Col md="auto" className="flightItem">
                            <h3 className="titleSeats">Seats</h3>
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
                                        seatsRowId *
                                          airline.PlaneSeatsNumber[1] +
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
                                        seatsRowId *
                                          airline.PlaneSeatsNumber[1] +
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
                                  <Col className="rightSideSeats">
                                    <EventSeatIcon
                                      value={
                                        seatsRowId *
                                          airline.PlaneSeatsNumber[1] +
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
                                        seatsRowId *
                                          airline.PlaneSeatsNumber[1] +
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
                                        seatsRowId *
                                          airline.PlaneSeatsNumber[1] +
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
                                  </Col>
                                </Container>
                              );
                            })}
                          </Col>
                          <Col className="flightItem">
                            <InputLabel id="luggageLabel">
                              Luggage Type / Price
                            </InputLabel>
                            <Select
                              labelId="luggageLabel"
                              onChange={this.onHandleLuggageChange}
                              value={this.state.luggage}
                            >
                              <MenuItem value={0}>
                                {airline.Luggage[0].Type.toString() +
                                  " / " +
                                  airline.Luggage[0].Price.toString()}
                              </MenuItem>
                              <MenuItem value={1}>
                                {airline.Luggage[1].Type.toString() +
                                  " / " +
                                  airline.Luggage[1].Price.toString()}
                              </MenuItem>
                            </Select>
                          </Col>
                          <Col className="flightItem">
                            <Button
                              className="flightReserveButton"
                              color="primary"
                              variant="contained"
                              onClick={() => this.openModal(flight.Id)}
                            >
                              Reserve
                            </Button>
                            <div className="flightReservationModal">
                              <Modal
                                style={modalStyle}
                                ariaHideApp={false}
                                isOpen={
                                  flight.Id === this.state.openedModal
                                    ? true
                                    : false
                                }
                                onRequestClose={this.closeModal}
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
                      </div>
                    </Collapse>
                  </Container>
                );
              })}
            </div>
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
