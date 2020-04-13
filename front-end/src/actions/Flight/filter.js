import finishedLoading from "../Loading/finishedLoading";
export const FILTER = "flight:filter";

export default function filter(selectedAirlines, selectedTripLengths) {
  return (dispatch) => {
    dispatch({
      type: FILTER,
      payload: {
        selectedAirlines: selectedAirlines,
        selectedTripLengths: selectedTripLengths,
      },
    });
  };
}
