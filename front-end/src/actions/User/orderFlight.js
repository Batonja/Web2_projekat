export const ORDER_FLIGHT = "user:orderFlight";

export default function orderFlight(orders, passengers) {
  return (dispatch) => {
    dispatch({
      type: ORDER_FLIGHT,
      payload: { orders: orders, passengers: passengers },
    });
  };
}
