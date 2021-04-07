import { SIGN_IN } from "../actions/User/signIn";
import { SIGN_UP } from "../actions/User/signUp";
import { FB_SIGN_IN } from "../actions/User/fbSignIn";
import { LOG_OFF } from "../actions/User/logOff";
 
import { ADD_FRIEND_TO_LIST } from "../actions/User/addFriend";
import {User} from '../app/models/user'

export const ROLES = {
  FLIGHT_ADMIN: "flightAdmin",
  CAR_ADMIN: "carAdmin",
  ADMIN: "admin",
  USER: "user",
};

const initialState = {
  LoggedInUser: new User(null, null, null,null,null, !null),
  ROLES: {
    FLIGHT_ADMIN: "FlightManager",
    CAR_ADMIN: "CarManager",
    ADMIN: "Administrator",
    USER: "RegularUser",
  },
};

export default function userReducer(state = initialState, { type, payload }) {
  //console.log("USER_REDUCER, ", payload, type);
  switch (type) {

    case SIGN_UP:
      return {...state};
    case SIGN_IN:
      
      return {...state, LoggedInUser: new User(payload.userId,payload.role,payload.displayName,payload.token,payload.username, payload.image) };
      break;
    case FB_SIGN_IN:
        console.log(FB_SIGN_IN);
    break;
    case LOG_OFF:
      return { ...state, LoggedInUser: new User(null, null, null,null,null,null) };
  
    default:
      return state;
  }
}
