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
      numOfNewSeats: 0
    };
  }

  updateProgress = () => {
    var currentProgress = this.state.progress;
    currentProgress++;
    this.setState({ progress: currentProgress });
  };

  updateSeats = (event, seats, numOfNewSeats) => {
    this.setState({ seats: seats, numOfNewSeats: numOfNewSeats });
  };

  render() {
    return (
      <Container fluid>
        {this.state.progress === 0 ? (
          <FirstStep
            airline={this.props.airline}
            flight={this.props.flight}
            goToNextStep={this.updateProgress}
            sendSeats={(event, seats, numOfNewSeats) =>
              this.updateSeats(event, seats, numOfNewSeats)
            }
          />
        ) : this.state.progress === 1 ? (
          <SecondStep />
        ) : (
          ""
        )}
      </Container>
    );
  }
}

export default ReservationModal;
