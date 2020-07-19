import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const SIGN_IN = "user:signIn";

export default function signIn(email, password, history) {
  return (dispatch) => {
    dispatch(loadingData());

    axios
      .post(ConnectTo + "user/signIn", {
        Email: email,
        Key: password,
        Salt: "salt",
        Address: "Adress",
        FirstName: "FirstName",
        LastName: "LastName",
      })
      .then((response) => {
        return response.data.errorCode === 200
          ? (toast.dark("You are signed in successfully"),
            dispatch({ type: SIGN_IN, payload: response.data.value }),
            history.push("/"))
          : toast.error("Sign in error: " + response.data.description);
      })
      .catch((error) => toast.error(error.message))
      .then(dispatch(finishedLoading()));

    /* dispatch({ type: SIGN_IN, payload: { email: email, password: password } });*/
  };
}
