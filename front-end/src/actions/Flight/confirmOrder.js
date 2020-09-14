import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const CONFIRM_ORDER = "airline:confirmOrder";

export default function confirmOrder(flightOrder) {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .post(ConnectTo + "airline/confirmFlight", flightOrder)
      .then((response) => {
        return response.data.errorCode === 200
          ? (dispatch({
              type: CONFIRM_ORDER,
              payload: response.data.value.flightOrderId,
            }),
            dispatch(finishedLoading()))
          : (dispatch(finishedLoading()),
            toast.error("Error while trying to confirm flight order"));
      })
      .catch((exception) => {
        toast.error("Error: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
