import EventSeatIcon from "@material-ui/icons/EventSeat";
import React from "react";

export function renderSeats(
  seatsRowId,
  seatsInRow,
  startValueIndex,
  seatsArray
) {
  var seats = [];

  for (
    var index = startValueIndex;
    index < startValueIndex + Math.floor(seatsInRow / 2);
    index++
  ) {
    seats.push(
      <EventSeatIcon
        value={seatsRowId * seatsInRow + index}
        color={
          +seatsArray[seatsRowId * seatsInRow + index] === -1
            ? "disabled"
            : seatsArray[seatsRowId * seatsInRow + index] === 0
            ? "secondary"
            : "primary"
        }
      />
    );
  }
  return seats;
}

export function renderSeatsWithMouseDown(
  seatsRowId,
  seatsInRow,
  startValueIndex,
  seatsArray,
  mouseDownFunction
) {
  var seats = [];
  for (
    var index = startValueIndex;
    index < startValueIndex + Math.floor(seatsInRow / 2);
    index++
  ) {
    const seatId = seatsRowId * seatsInRow + index;
    const seat = (
      <EventSeatIcon
        value={seatId}
        color={
          seatsArray[seatId] === -1
            ? "disabled"
            : seatsArray[seatId] === 0
            ? "secondary"
            : "primary"
        }
        onMouseDown={(e, color, theseatId) =>
          mouseDownFunction(
            e,
            seatsRowId === 0
              ? "disabled"
              : seatsArray[seatId] === 0
              ? "secondary"
              : "primary",
            seatId
          )
        }
      />
    );
    seats.push(seat);
  }
  return seats;
}
