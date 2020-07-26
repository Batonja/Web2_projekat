import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const ADD_FLIGHT = "flight:addFlight";

export default function addFlight(flight) {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .post(ConnectTo + "airline/addFlight", flight)
      .then((response) => {
        return response.data.errorCode === 200
          ? (dispatch({ type: ADD_FLIGHT, payload: response.data }),
            toast.dark("Flight added successfully"),
            dispatch(finishedLoading()))
          : (toast.error("AddFlightError: " + response.data.description),
            dispatch(finishedLoading()));
      })
      .catch((exception) => {
        toast.error("AddFlightException: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
