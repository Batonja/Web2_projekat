import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
export const RESERVE_SEATS = "flight:reserveSeats";

export default function reserveSeats(seats, passengers, airlineId, flightId) {
  return (dispatch) => {
    loadingData();
    dispatch({
      type: RESERVE_SEATS,
      payload: {
        seats: seats,
        passengers: passengers,
        airlineId: airlineId,
        flightId: flightId,
      },
    });
    finishedLoading();
  };
}
