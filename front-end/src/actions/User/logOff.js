export const LOG_OFF = "user:logOff";

export default function logOff() {
  return (dispatch) => {
    dispatch({ type: LOG_OFF });
  };
}
