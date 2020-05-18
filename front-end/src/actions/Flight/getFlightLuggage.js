import axios from "axios";
import LOADING_DATA from "../Loading/loadingData";
import FINISHED_LOADING from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const GET_FLIGHT_LUGGAGE = "flight:getFlightLuggage";

export default function getFlightLuggage() {
  return (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(ConnectTo + "airline/GetFlightLuggage")
      .then((response) => {
        return (
          dispatch({ type: GET_FLIGHT_LUGGAGE, payload: response.data }),
          dispatch({ type: FINISHED_LOADING })
        );
      })
      .catch((exception) => {
        toast.error("GetFlightLuggageException:" + exception.message);
        dispatch({ type: FINISHED_LOADING });
      });
  };
}
