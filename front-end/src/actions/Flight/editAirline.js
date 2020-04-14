export const EDIT_AIRLINE = "flight:editAirline";

export default function editAirline(airline) {
  return (dispatch) => {
    dispatch({ type: EDIT_AIRLINE, payload: { airline: airline } });
  };
}
6;
