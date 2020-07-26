import loadingData from "../Loading/loadingData";
import axios from "axios";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const FILTER = "flight:filter";

export default function filter(filterObject) {
  return (dispatch) => {
    dispatch(loadingData());

    axios
      .post(ConnectTo + "airline/Filter", filterObject)
      .then((response) => {
        dispatch({ type: FILTER, payload: response.data });
        dispatch(finishedLoading());
      })
      .catch((exception) => {
        toast.error(
          "Error while trying to send AirlineFilter request to server:" +
            exception
        );
        dispatch(finishedLoading());
      });
  };
}
