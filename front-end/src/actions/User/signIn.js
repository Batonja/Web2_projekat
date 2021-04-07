import agent from '../../app/api/agent'
import { UserLogin } from "app/models/user";
export const SIGN_IN = "user:signIn";




export default function signIn(email, password, history) {
  return (dispatch) => {

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

        return (history.push("/"),
          dispatch({ type: SIGN_IN, payload: response }))
      })

    // dispatch({ type: SIGN_IN, payload: { email: email, password: password } });
  };
}
