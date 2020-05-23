import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const GET_FLIGHT_LUGGAGE = "flight:getFlightLuggage";

export default function getFlightLuggage() {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .get(ConnectTo + "airline/GetFlightLuggage")
      .then((response) => {
        return (
          dispatch({ type: GET_FLIGHT_LUGGAGE, payload: response.data }),
          dispatch(finishedLoading())
        );
      })
      .catch((exception) => {
        toast.error("GetFlightLuggageException:" + exception.message);
        dispatch(finishedLoading());
      });
  };
}
