export const SEARCH = "flight:search";

export default function search(
  ticketPrice,
  destination,
  arrivalDate,
  departureDate
) {
  return (dispatch) => {
    var searchParameters = {
      ticketPrice: ticketPrice,
      destination: destination,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
    };
    dispatch({
      type: SEARCH,
      payload: searchParameters,
    });
  };
}
