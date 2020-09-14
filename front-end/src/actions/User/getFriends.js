import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const GET_FRIENDS = "user:getFriends";

export default function getFriends() {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .get(ConnectTo + "user/getFriends")
      .then((response) => {
        return (
          dispatch({ type: GET_FRIENDS, payload: response.data }),
          dispatch(finishedLoading())
        );
      })
      .catch((exception) => {
        toast.error("Error: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
