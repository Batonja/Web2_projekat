import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";

import agent from '../../app/api/agent'

import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
import { UserLogin } from "app/models/user";
export const SIGN_IN = "user:signIn";




export default function signIn(email, password, history) {
  return (dispatch) => {
    // dispatch(loadingData());

    // axios
    //   .post(ConnectTo + "user/signIn", {
    //     Email: email,
    //     Key: password,
    //     Salt: "salt",
    //     Address: "Adress",
    //     FirstName: "FirstName",
    //     LastName: "LastName",
    //   })
    //   .then((response) => {
    //     return response.data.errorCode === 200
    //       ? (toast.dark("You are signed in successfully"),
    //         history.push("/"),
    //         dispatch({ type: SIGN_IN, payload: response.data.value }))
    //       : toast.error("Sign in error: " + response.data.description);
    //   })
    //   .catch((error) => toast.error(error.message))
    //   .then(dispatch(finishedLoading()));


    const userLogin = new UserLogin(email, password)
    const user = agent.User.login(userLogin)
      .catch(e => console.log(e))
      .then(response => {
        
        var base64Url = response.token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        var tokenClaims = JSON.parse(jsonPayload);
        //console.log(tokenClaims)
        response.userId = tokenClaims.nameid
        response.role = tokenClaims.role 
        console.log("payload",response)       
        return (history.push("/cars"),
          dispatch({ type: SIGN_IN, payload: response }))
      })

    // dispatch({ type: SIGN_IN, payload: { email: email, password: password } });
  };
}
