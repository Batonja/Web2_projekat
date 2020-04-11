import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "react-bootstrap/Alert";
//import EventSeatIcon from "@material-ui/icons/EventSeat";
import FlightBasicInformation from "../Preview/FlightBasicInformation";
import Modal from "react-bootstrap/Modal";
import { renderSeatsWithMouseDown } from "../Common/Helpers/renderSeats";

class FirstStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seats: [],
      seatsIds: [],
      numReservedSeats: 0,
      invalidForm: false,
    };
  }

  componentDidMount() {
    this.setState({
      seats: Array.from(this.props.flight.Seats),
    });
  }

  onHandleAddSeat = (event, color, seatId) => {
    var seats = this.state.seats;
    var numReserved = this.state.numReservedSeats;
    if (event.button === 0) {
      if (seats[seatId] === 0) {
        seats[seatId] = 1;
        numReserved--;
      } else if (seats[seatId] === 1) {
        seats[seatId] = 0;
        numReserved++;
      }

      this.setState({
        seats: seats,
        numReservedSeats: numReserved,
        seatsIds: this.state.seatsIds.concat(seatId),
      });
    }
  };
  onAddReservation = (event) => {
    if (event.button === 0) {
      if (this.state.numReservedSeats <= 0) {
        this.setState({ invalidForm: true });

        return;
      }

      var completedReservations = 0;

      this.props.sendSeats(
        this.state.seats,
        this.state.numReservedSeats,
        completedReservations,
        this.state.seatsIds
      );

      this.props.goToNextStep();
    }
  };

  render() {
    const seatsInARow = 6;
    return (
      <>
        <Modal.Header>
          <h2 style={{ "margin-left": "35%" }}>Reserve Your Seats</h2>
        </Modal.Header>
        <Modal.Body>
          <Row className="flightPresentRow">
            <FlightBasicInformation
              airline={this.props.airline}
              flight={this.props.flight}
            />
            <Col md="auto" className="flightItem">
              <TextField
                label="Changeovers"
                value={this.props.flight.ChangeOvers.toString()}
              />
            </Col>
          </Row>
          <br />

          <Row className="flightPresentRow">
            <Col md="auto" className="flightItem">
              {renderSeatsWithMouseDown(this.state.seats, (e, color, seatId) =>
                this.onHandleAddSeat(e, color, seatId)
              )}
            </Col>

            <Col md="auto" className="flightItem">
              <Row>
                <Col>
                  <Button
                    className="flightReserveButton"
                    color="primary"
                    variant="contained"
                    onMouseDown={(event) => this.onAddReservation(event)}
                  >
                    Reserve
                  </Button>
                  {this.state.invalidForm ? (
                    <Alert variant="warning">
                      {" "}
                      You haven't picked any seats to reserve, please choose
                      some{" "}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </>
    );
  }
}

export default FirstStep;
