import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const GET_USERS = "user:getUsers";

export default function getUsers() {
  return (dispatch) => {
    dispatch(loadingData());

    axios
      .get(ConnectTo + "user/getUsers")
      .then((response) => {
        dispatch({ type: GET_USERS, payload: response.data });
      })
      .then(dispatch(finishedLoading()));
  };
}
