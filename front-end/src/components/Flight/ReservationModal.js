import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import FlightBasicInformation from "./Preview/FlightBasicInformation";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class ReservationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      luggage: 0,
      seats: []
    };
  }

  componentDidMount() {
    this.setState({ seats: this.props.flight.Seats });
  }

  onHandleAddSeat(event) {
    event.preventDefault();
    alert(1);
  }

  isClicked = (event, color, seatId) => {
    var seats = this.state.seats;
    if (event.button === 0) {
      if (color === "secondary") {
        seats[seatId] = 1;
      } else if (color === "primary") {
        seats[seatId] = 0;
      }

      this.setState({ seats: seats });
    }
  };

  onHandleLuggageChange = event => {
    this.setState({ luggage: event.target.value });
  };
  render() {
    return (
      <Container fluid>
        <Row className="flightPresentRow">
          <FlightBasicInformation
            airline={this.props.airline}
            flight={this.props.flight}
          />
        </Row>
        <br />
        <Row className="flightPresentRow">
          <Col md="auto" className="flightItem">
            {Array.from(new Array(this.props.airline.PlaneSeatsNumber[0])).map(
              (seatsRow, seatsRowId) => {
                return (
                  <Container className="flightSeats">
                    <Row className="leftSideSeats">
                      <EventSeatIcon
                        value={
                          seatsRowId * this.props.airline.PlaneSeatsNumber[1]
                        }
                        color={
                          seatsRowId === 0
                            ? "disabled"
                            : this.state.seats[
                                seatsRowId *
                                  this.props.airline.PlaneSeatsNumber[1]
                              ] === 0
                            ? "secondary"
                            : "primary"
                        }
                        onMouseDown={(e, color, seatId) =>
                          this.isClicked(
                            e,
                            seatsRowId === 0
                              ? "disabled"
                              : this.state.seats[
                                  seatsRowId *
                                    this.props.airline.PlaneSeatsNumber[1]
                                ] === 0
                              ? "secondary"
                              : "primary",
                            seatsRowId * this.props.airline.PlaneSeatsNumber[1]
                          )
                        }
                      />

                      <EventSeatIcon
                        value={
                          seatsRowId * this.props.airline.PlaneSeatsNumber[1] +
                          1
                        }
                        color={
                          seatsRowId === 0
                            ? "disabled"
                            : this.state.seats[
                                seatsRowId *
                                  this.props.airline.PlaneSeatsNumber[1] +
                                  1
                              ] === 0
                            ? "secondary"
                            : "primary"
                        }
                        onMouseDown={(e, color, seatId) =>
                          this.isClicked(
                            e,
                            seatsRowId === 0
                              ? "disabled"
                              : this.state.seats[
                                  seatsRowId *
                                    this.props.airline.PlaneSeatsNumber[1] +
                                    1
                                ] === 0
                              ? "secondary"
                              : "primary",
                            seatsRowId *
                              this.props.airline.PlaneSeatsNumber[1] +
                              1
                          )
                        }
                      />
                      <EventSeatIcon
                        value={
                          seatsRowId * this.props.airline.PlaneSeatsNumber[1] +
                          2
                        }
                        color={
                          seatsRowId === 0
                            ? "disabled"
                            : this.state.seats[
                                seatsRowId *
                                  this.props.airline.PlaneSeatsNumber[1] +
                                  2
                              ] === 0
                            ? "secondary"
                            : "primary"
                        }
                        onMouseDown={(e, color, seatId) =>
                          this.isClicked(
                            e,
                            seatsRowId === 0
                              ? "disabled"
                              : this.state.seats[
                                  seatsRowId *
                                    this.props.airline.PlaneSeatsNumber[1] +
                                    2
                                ] === 0
                              ? "secondary"
                              : "primary",
                            seatsRowId *
                              this.props.airline.PlaneSeatsNumber[1] +
                              2
                          )
                        }
                      />
                    </Row>
                    <Row className="rightSideSeats">
                      <EventSeatIcon
                        value={
                          seatsRowId * this.props.airline.PlaneSeatsNumber[1] +
                          3
                        }
                        color={
                          seatsRowId === 0
                            ? "disabled"
                            : this.state.seats[
                                seatsRowId *
                                  this.props.airline.PlaneSeatsNumber[1] +
                                  3
                              ] === 0
                            ? "secondary"
                            : "primary"
                        }
                        onMouseDown={(e, color, seatId) =>
                          this.isClicked(
                            e,
                            seatsRowId === 0
                              ? "disabled"
                              : this.state.seats[
                                  seatsRowId *
                                    this.props.airline.PlaneSeatsNumber[1] +
                                    3
                                ] === 0
                              ? "secondary"
                              : "primary",
                            seatsRowId *
                              this.props.airline.PlaneSeatsNumber[1] +
                              3
                          )
                        }
                      />
                      <EventSeatIcon
                        value={
                          seatsRowId * this.props.airline.PlaneSeatsNumber[1] +
                          4
                        }
                        color={
                          seatsRowId === 0
                            ? "disabled"
                            : this.state.seats[
                                seatsRowId *
                                  this.props.airline.PlaneSeatsNumber[1] +
                                  4
                              ] === 0
                            ? "secondary"
                            : "primary"
                        }
                        onMouseDown={(e, color, seatId) =>
                          this.isClicked(
                            e,
                            seatsRowId === 0
                              ? "disabled"
                              : this.state.seats[
                                  seatsRowId *
                                    this.props.airline.PlaneSeatsNumber[1] +
                                    4
                                ] === 0
                              ? "secondary"
                              : "primary",
                            seatsRowId *
                              this.props.airline.PlaneSeatsNumber[1] +
                              4
                          )
                        }
                      />
                      <EventSeatIcon
                        value={
                          seatsRowId * this.props.airline.PlaneSeatsNumber[1] +
                          5
                        }
                        color={
                          seatsRowId === 0
                            ? "disabled"
                            : this.state.seats[
                                seatsRowId *
                                  this.props.airline.PlaneSeatsNumber[1] +
                                  5
                              ] === 0
                            ? "secondary"
                            : "primary"
                        }
                        onMouseDown={(e, color, seatId) =>
                          this.isClicked(
                            e,
                            seatsRowId === 0
                              ? "disabled"
                              : this.state.seats[
                                  seatsRowId *
                                    this.props.airline.PlaneSeatsNumber[1] +
                                    5
                                ] === 0
                              ? "secondary"
                              : "primary",
                            seatsRowId *
                              this.props.airline.PlaneSeatsNumber[1] +
                              5
                          )
                        }
                      />
                    </Row>
                  </Container>
                );
              }
            )}
          </Col>

          <Col md="auto" className="flightItem">
            <Row>
              <Col>
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
            </Row>
            <br />
            <Row>
              <Col>
                <TextField
                  label="Changeovers"
                  value={this.props.flight.ChangeOvers.toString()}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Button
                  className="flightReserveButton"
                  color="primary"
                  variant="contained"
                >
                  Reserve
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <Row className="flightPresentRow"></Row>
      </Container>
    );
  }
}

export default ReservationModal;
