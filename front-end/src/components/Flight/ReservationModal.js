import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import FirstStep from "./Reservation/FirstStep";
import SecondStep from "./Reservation/SecondStep";
import { connect } from "react-redux";
import reserveSeats from "../../actions/Flight/reserveSeats";
class ReservationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      seats: [],
      seatsIds: [],
      numOfReservations: 0,
      numOfCompletedReservations: 0,
      passengers: [],
    };
  }

  updateProgress = () => {
    var currentProgress = this.state.progress;
    currentProgress++;
    this.setState({ progress: currentProgress });
  };

  updateSeats = (
    seats,
    numOfReservations,
    numOfCompletedReservations,
    seatsIds
  ) => {
    this.setState({
      seats: seats,
      seatsIds: seatsIds,
      numOfReservations: numOfReservations,
      numOfCompletedReservations: numOfCompletedReservations,
    });
  };

  reserveSeat = (passenger) => {
    var completedReservations = this.state.numOfCompletedReservations + 1;
    var passengers = this.state.passengers;
    passengers.push(passenger);
    if (completedReservations === this.state.numOfReservations) {
      this.props.closeModal();
      this.props.OnReserveSeats(
        this.state.seats,
        passengers,
        this.props.airline.Id,
        this.props.flight.Id
      );
      return;
    }

    this.setState({
      numOfCompletedReservations: completedReservations,
      passengers: passengers,
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
            sendSeats={(
              seats,
              numOfReservations,
              numOfCompletedReservations,
              seatsIds
            ) =>
              this.updateSeats(
                seats,
                numOfReservations,
                numOfCompletedReservations,
                seatsIds
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
            reserveSeat={(passenger) => this.reserveSeat(passenger)}
            seats={this.state.seats}
            seatsIds={this.state.seatsIds}
          />
        ) : (
          ""
        )}
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  OnReserveSeats: (seats, passengers, airlineId, flightId) =>
    dispatch(reserveSeats(seats, passengers, airlineId, flightId)),
});

export default connect(null, mapDispatchToProps)(ReservationModal);
