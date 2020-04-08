export const FINISHED_LOADING = "loading:finishedLoading";

export default function finishedLoading() {
  return (dispatch) => {
    dispatch({ type: FINISHED_LOADING, payload: false });
  };
}
