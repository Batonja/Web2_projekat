import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const ADD_DESTINATION = "flight:addDestination";

export default function addDestination(title) {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .post(ConnectTo + "airline/AddDestination", { Title: title })
      .then((response) => {
        return response.data.errorCode === 200
          ? (dispatch({ type: ADD_DESTINATION, payload: response.data }),
            toast.dark("Destination added successfully"),
            dispatch(finishedLoading()))
          : (toast.error("AddDestinationError: " + response.data.description),
            dispatch(finishedLoading()));
      })
      .catch((exception) => {
        toast.error("AddDestinationException: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
