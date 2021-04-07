
import userReducer from "./userReducer";
import loadingReducer from "./loadingReducer";
import { combineReducers } from "redux";
import carsReducer from './carsReducer'
import rentingReducer from "./rentingReducer";


const rootReducer = combineReducers({
  userReducer: userReducer,
  loadingReducer: loadingReducer,
  carsReducer: carsReducer,
  rentingReducer: rentingReducer
});

export default rootReducer;
