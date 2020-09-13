import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const DELETE_ORDER = "airline:deleteOrder";

export default function deleteOrder(flightOrder) {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .post(ConnectTo + "airline/deleteFlightOrder", flightOrder)
      .then((response) => {
        return response.data.errorCode === 200
          ? (dispatch({
              type: DELETE_ORDER,
              payload: response.data.value.flightOrderId,
            }),
            dispatch(finishedLoading()))
          : (dispatch(finishedLoading()),
            toast.error("Error while trying to delete flight order"));
      })
      .catch((exception) => {
        toast.error("Error: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
