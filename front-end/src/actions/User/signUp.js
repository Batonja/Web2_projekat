import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const SIGN_UP = "user:signIn";

export default function signUp(user, history) {
  return (dispatch) => {
    dispatch(loadingData());

    axios
      .post(ConnectTo + "user/signUp", user)
      .then((response) => {
        return response.data.errorCode === 200
          ? (toast.dark("You have registered successfully"),
            history.push("/"),
            dispatch({ type: SIGN_UP, payload: response.data.value }),
            history.push("/signIn"),
            dispatch(finishedLoading()))
          : (toast.error("Sign up error: " + response.data.description),
            dispatch(finishedLoading()));
      })
      .catch(
        (error) => toast.error(error.message),
        dispatch(finishedLoading())
      );
  };
}
