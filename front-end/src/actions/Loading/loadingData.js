export const LOADING_DATA = "loading:isLoading";

export default function loadingData() {
  return (dispatch) => {
    return dispatch({ type: LOADING_DATA, payload: true });
  };
}
