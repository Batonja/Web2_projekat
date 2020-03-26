import flightReducer from "./flightReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  flightReducer: flightReducer,
  userReducer: userReducer
});

export default rootReducer;
