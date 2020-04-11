import EventSeatIcon from "@material-ui/icons/EventSeat";
import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export function renderSeats(seats) {
  var seatObjects = [];
  for (var index = 0; index < seats.length; index++) {
    const seatId = index;
    seatObjects.push(
      <EventSeatIcon
        value={seatId}
        color={
          seats[index] === -1
            ? "action"
            : seats[index] === 0
            ? "secondary"
            : seats[index] == 2
            ? "disabled"
            : "primary"
        }
      />
    );
  }
  var seatsInRow = [];
  for (var index = 0; index < seatObjects.length; index = index + 6) {
    seatsInRow.push(
      <Container className="flightSeats">
        <Row className="leftSideSeats">
          {index + 1 > seatObjects.length ? "" : seatObjects[index]}
          {index + 2 > seatObjects.length ? "" : seatObjects[index + 1]}
          {index + 3 > seatObjects.length ? "" : seatObjects[index + 2]}
        </Row>
        <Row className="rightSideSeats">
          {index + 4 > seatObjects.length ? "" : seatObjects[index + 3]}
          {index + 5 > seatObjects.length ? "" : seatObjects[index + 4]}
          {index + 6 > seatObjects.length ? "" : seatObjects[index + 5]}
        </Row>
      </Container>
    );
  }

  return seatsInRow;
}

export function renderSeatsWithMouseDown(seats, mouseDownFunction) {
  var seatObjects = [];
  for (var index = 0; index < seats.length; index++) {
    const seatId = index;
    const seat = (
      <EventSeatIcon
        value={seatId}
        color={
          seats[index] === -1
            ? "action"
            : seats[index] === 0
            ? "secondary"
            : seats[index] == 2
            ? "disabled"
            : "primary"
        }
        onMouseDown={(e) =>
          mouseDownFunction(
            e,
            seats[seatId] === -1
              ? "action"
              : seats[seatId] === 0
              ? "secondary"
              : seats[seatId] == 2
              ? "disabled"
              : "primary",
            seatId
          )
        }
      />
    );
    seatObjects.push(seat);
  }

  var seatsInRow = [];
  for (var index = 0; index < seatObjects.length; index = index + 6) {
    seatsInRow.push(
      <Container className="flightSeats">
        <Row className="leftSideSeats">
          {index + 1 > seatObjects.length ? "" : seatObjects[index]}
          {index + 2 > seatObjects.length ? "" : seatObjects[index + 1]}
          {index + 3 > seatObjects.length ? "" : seatObjects[index + 2]}
        </Row>
        <Row className="rightSideSeats">
          {index + 4 > seatObjects.length ? "" : seatObjects[index + 3]}
          {index + 5 > seatObjects.length ? "" : seatObjects[index + 4]}
          {index + 6 > seatObjects.length ? "" : seatObjects[index + 5]}
        </Row>
      </Container>
    );
  }

  return seatsInRow;
}
