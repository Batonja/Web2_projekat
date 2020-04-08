import flightReducer from "./flightReducer";
import userReducer from "./userReducer";
import loadingReducer from "./loadingReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  flightReducer: flightReducer,
  userReducer: userReducer,
  loadingReducer: loadingReducer,
});

export default rootReducer;
