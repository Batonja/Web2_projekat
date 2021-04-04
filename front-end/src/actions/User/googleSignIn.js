import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const GOOGLE_SIGN_IN = "user:googleSignIn";

export default function googleSignIn(user, history) {
  return (dispatch) => {
    // dispatch(loadingData());

    // axios
    //   .post(ConnectTo + "user/googleAuthorization", {
    //     Email: user.email,
    //     Key: user.password,
    //     Address: "Adress",
    //     FirstName: user.name,
    //     LastName: "LastName",
    //   })
    //   .then((response) => {
    //     return response.data.errorCode === 200
    //       ? (toast.dark("You are signed in successfully"),
    //         history.push("/"),
    //         dispatch({ type: GOOGLE_SIGN_IN, payload: response.data.value }))
    //       : toast.error("Google sign in error: " + response.data.description);
    //   })
    //   .catch((error) => toast.error(error.message))
    //   .then(dispatch(finishedLoading()));
  };
}
