import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const CONFIRM_FRIENDSHIP = "user:confirmFriendship";

export default function confirmFriendship(friend) {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .post(ConnectTo + "user/confirmFriendship", friend)
      .then((response) => {
        return response.data.errorCode === 200
          ? (dispatch({
              type: CONFIRM_FRIENDSHIP,
              payload: response.data.value,
            }),
            dispatch(finishedLoading()))
          : (dispatch(finishedLoading()),
            toast.error("Error while trying to confirm friendship"));
      })
      .catch((exception) => {
        toast.error("Error: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
