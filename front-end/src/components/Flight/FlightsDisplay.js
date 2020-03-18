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

const modalStyle = { "z-index": "1300" };

class FlightsDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedCollapsed: [],
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
            <div>
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
                      <div>
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
                                  <Row className="rightSideSeats">
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
                                  </Row>
                                </Container>
                              );
                            })}
                          </Col>

                          <Col className="flightItem">
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
                                <Modal.Header>
                                  <h2 style={{ "margin-left": "35%" }}>
                                    Reserve Your Seats
                                  </h2>
                                </Modal.Header>
                                <Modal.Footer>
                                  <ReservationModal
                                    airline={airline}
                                    flight={flight}
                                    closeModal={this.closeModal}
                                  />
                                </Modal.Footer>
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
