export const CANCEL_ALL_FLIGHT_ORDERS = "flight:cancelAllOrders";

export default function cancelAllFlightOrders(airlineId, flightId, seatId) {
  return (dispatch) => {
    dispatch({
      type: CANCEL_ALL_FLIGHT_ORDERS,
      payload: { airlineId: airlineId, flightId: flightId, seatId: seatId },
    });
  };
}
