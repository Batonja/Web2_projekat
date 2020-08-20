import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const ADD_AIRLINE = "flight:addAirline";

export default function addAirline(airline) {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .post(ConnectTo + "airline/addAirline", airline)
      .then((response) => {
        return response.data.errorCode === 200
          ? (dispatch({ type: ADD_AIRLINE, payload: response.data.value }),
            toast.dark("Airline added successfully"),
            dispatch(finishedLoading()))
          : (alert("AddAirlineError: " + response),
            dispatch(finishedLoading()));
      })
      .catch((exception) => {
        toast.error("AddAirlineException: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
