export const RESERVE_SEATS = "flight:reserveSeats";
// -1 => za FastReservation, 0 => rezervacija u procesu (secondary), 1 => slobodno, 2 => rezevisano (disabled)
export default function reserveSeats(seats, passengers, airlineId, flightId) {
  return (dispatch) => {
    var reserveAllSeats = seats;

    for (var indexOfSeat = 0; indexOfSeat < seats.length; indexOfSeat++) {
      if (reserveAllSeats[indexOfSeat] === 0) {
        reserveAllSeats[indexOfSeat] = 2;
      }
    }

    dispatch({
      type: RESERVE_SEATS,
      payload: {
        seats: reserveAllSeats,
        passengers: passengers,
        airlineId: airlineId,
        flightId: flightId,
      },
    });
  };
}
