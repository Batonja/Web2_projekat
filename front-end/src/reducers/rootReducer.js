import flightReducer from "./flightReducer";
import userReducer from "./userReducer";
import loadingReducer from "./loadingReducer";
import { combineReducers } from "redux";
import carsReducer from './carsReducer'

const rootReducer = combineReducers({
  flightReducer: flightReducer,
  userReducer: userReducer,
  loadingReducer: loadingReducer,
  carsReducer: carsReducer
});

export default rootReducer;
