import axios from "axios";
import LOADING_DATA from "../Loading/loadingData";
import FINISHED_LOADING from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const ADD_DESTINATION = "flight:addDestination";

export default function addDestination(title) {
  return (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .post(ConnectTo + "airline/AddDestination", { Title: title })
      .then((response) => {
        return response.data.errorCode === 200
          ? (dispatch({ type: ADD_DESTINATION, payload: response.data }),
            toast.dark("Destination added successfully"))
          : (toast.error("AddDestinationError: " + response.data.description),
            dispatch({ type: FINISHED_LOADING }));
      })
      .catch((exception) => {
        toast.error("AddDestinationException: " + exception.message);
      });
  };
}
