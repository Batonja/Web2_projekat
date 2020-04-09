export const SIGN_IN = "user:signIn";

export default function signIn(email, password) {
  return (dispatch) => {
    dispatch({ type: SIGN_IN, payload: { email: email, password: password } });
  };
}
