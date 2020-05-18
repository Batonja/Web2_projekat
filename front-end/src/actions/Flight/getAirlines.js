import axios from "axios";
import LOADING_DATA from "../Loading/loadingData";
import FINISHED_LOADING from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const GET_AIRLINES = "airlines:getAirlines";

export default function getAirlines() {
  return (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(ConnectTo + "airline/get")
      .then((response) => {
        return (
          dispatch({ type: GET_AIRLINES, payload: response.data }),
          dispatch({ type: FINISHED_LOADING })
        );
      })
      .catch((exception) => {
        toast.error("GetAirlinesException: " + exception.message);
      });
  };
}
