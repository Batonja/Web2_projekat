import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const GET_AIRLINES = "airlines:getAirlines";

export default function getAirlines() {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .get(ConnectTo + "airline/get")
      .then((response) => {
        return (
          dispatch({ type: GET_AIRLINES, payload: response.data }),
          dispatch(finishedLoading())
        );
      })
      .catch((exception) => {
        toast.error("GetAirlinesException: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
