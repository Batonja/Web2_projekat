import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import FirstStep from "./Reservation/FirstStep";
import SecondStep from "./Reservation/SecondStep";
import { connect } from "react-redux";
import reserveSeats from "../../actions/Flight/reserveSeats";
import loadingData from "../../actions/Loading/loadingData";
import finishedLoading from "../../actions/Loading/finishedLoading";
import orderFlight from "../../actions/User/orderFlight";
import signUp from "../../actions/User/signUp";

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
      orders: [],
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

  reserveSeat = (passenger, order) => {
    var completedReservations = this.state.numOfCompletedReservations + 1;
    var passengers = this.state.passengers;
    var orders = this.state.orders;

    this.props.OnSignUp(passenger, this.props.history);
    //passengers.push(passenger);
    if (completedReservations === this.state.numOfReservations) {
      this.props.closeModal();

      this.props.OnReserveSeats(
        order,
        passenger,
        this.props.airline.Id,
        this.props.flight.Id
      );

      return;
    }

    this.setState({
      numOfCompletedReservations: completedReservations,
      passengers: passengers,
      orders: orders,
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
            reserveSeat={(passenger, order) =>
              this.reserveSeat(passenger, order)
            }
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

const mapStateToProps = (state) => ({
  loggedInUser: state.userReducer.LoggedInUser,
});

const mapDispatchToProps = (dispatch) => ({
  OnReserveSeats: (order, passengers, airlineId, flightId) =>
    dispatch(reserveSeats(order, passengers, airlineId, flightId)),
  OnLoading: () => dispatch(loadingData()),
  OnFinishedLoading: () => dispatch(finishedLoading()),
  OnOrderFlight: (order, passengers) =>
    dispatch(orderFlight(order, passengers)),
  OnSignUp: (user, history) => dispatch(signUp(user, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationModal);
