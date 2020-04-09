export const SIGN_UP = "user:signUp";

export default function signUp(user) {
  return (dispatch) => {
    dispatch({ type: SIGN_UP, payload: user });
  };
}
