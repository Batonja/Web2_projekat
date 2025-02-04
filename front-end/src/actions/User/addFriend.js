import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const ADD_FRIEND = "user:addFriend";
// u FriendOf onaj kome saljem zahtev a u FriendWith onaj sa kojeg saljes zahtev (sa ovim si ulogovan)
export default function addFriend(friend) {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .post(ConnectTo + "user/addFriend", friend)
      .then((response) => {
        return response.data.errorCode === 200
          ? (dispatch({
              type: ADD_FRIEND,
              payload: response.data.value,
            }),
            dispatch(finishedLoading()),
            toast.dark("Friend request sent"))
          : (dispatch(finishedLoading()),
            toast.error("Error while trying to add friend"));
      })
      .catch((exception) => {
        toast.error("Error: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
