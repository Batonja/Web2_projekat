import axios from "axios";
import LOADING_DATA from "../Loading/loadingData";
import FINISHED_LOADING from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const GET_DESTINATIONS = "flight:getDestinations";

export default function getDestinations() {
  return (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(ConnectTo + "airline/GetDestinations")
      .then((response) => {
        return (
          dispatch({ type: GET_DESTINATIONS, payload: response.data }),
          dispatch({ type: FINISHED_LOADING })
        );
      })
      .catch((exception) => {
        toast.error("GetDestinationsException:" + exception.message);
        dispatch({ type: FINISHED_LOADING });
      });
  };
}
