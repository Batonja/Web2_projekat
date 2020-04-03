import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import FirstStep from "./Reservation/FirstStep";
import SecondStep from "./Reservation/SecondStep";

class ReservationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      seats: [],
      numOfReservations: 0,
      numOfCompletedReservations: 0,
      passengers: []
    };
  }

  updateProgress = () => {
    var currentProgress = this.state.progress;
    currentProgress++;
    this.setState({ progress: currentProgress });
  };

  updateSeats = (seats, numOfReservations, numOfCompletedReservations) => {
    this.setState({
      seats: seats,
      numOfReservations: numOfReservations,
      numOfCompletedReservations: numOfCompletedReservations
    });
  };

  reserveSeat = passenger => {
    var completedReservations = this.state.numOfCompletedReservations + 1;
    this.setState({
      numOfCompletedReservations: completedReservations,
      passengers: [...this.state.passengers, passenger]
    });
  };

  render() {
    return (
      <Container fluid>
        {this.state.progress === 0 ? (
          <FirstStep
            airline={this.props.airline}
            flight={this.props.flight}
            goToNextStep={this.updateProgress}
            sendSeats={(seats, numOfReservations, numOfCompletedReservations) =>
              this.updateSeats(
                seats,
                numOfReservations,
                numOfCompletedReservations
              )
            }
          />
        ) : this.state.progress === 1 &&
          this.state.numOfReservations !==
            this.state.numOfCompletedReservations ? (
          <SecondStep
            airline={this.props.airline}
            flight={this.props.flight}
            numOfReservations={this.state.numOfReservations}
            numOfCompletedReservations={this.state.numOfCompletedReservations}
            reserveSeat={passenger => this.reserveSeat(passenger)}
          />
        ) : (
          ""
        )}
      </Container>
    );
  }
}

export default ReservationModal;
