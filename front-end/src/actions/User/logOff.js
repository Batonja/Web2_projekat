import { toast } from "react-toastify";
export const LOG_OFF = "user:logOff";

export default function logOff() {
  return (dispatch) => {
    dispatch({ type: LOG_OFF });
    toast.dark("You have been logged off successfully");
  };
}
