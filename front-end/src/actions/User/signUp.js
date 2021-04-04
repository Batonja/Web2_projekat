import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { toast } from "react-toastify";
import { UserRegistration } from "app/models/user";

import agent from '../../app/api/agent'


export const SIGN_UP = "user:signUp";

export default function signUp(user, history) {
  return (dispatch) => {
    console.log(user)

      agent.User.register(user)
      .catch(e => console.log(e))
      .then(response => {
        console.log(response)
         
        console.log("payload",response)       
        return (history.push("/verifyAccountInfo"),
          dispatch({ type: SIGN_UP, payload: response }))
      })
  };
}
