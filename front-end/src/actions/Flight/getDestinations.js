import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const GET_DESTINATIONS = "flight:getDestinations";

export default function getDestinations() {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .get(ConnectTo + "airline/GetDestinations")
      .then((response) => {
        return (
          dispatch({ type: GET_DESTINATIONS, payload: response.data }),
          dispatch(finishedLoading())
        );
      })
      .catch((exception) => {
        toast.error("GetDestinationsException:" + exception.message);
        dispatch(finishedLoading());
      });
  };
}
