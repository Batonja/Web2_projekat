export const ORDER_FLIGHT = "user:orderFlight";

export default function orderFlight(userEmail, order) {
  return (dispatch) => {
    dispatch({
      type: ORDER_FLIGHT,
      payload: { userEmail: userEmail, order: order },
    });
  };
}
