import { SIGN_IN } from "../actions/User/signIn";
import { SIGN_UP } from "../actions/User/signUp";
import { LOG_OFF } from "../actions/User/logOff";
import {CAR_ORDER_TO_PROFILE} from '../actions/User/carOrderToProfile'
export const ROLES = {
  FLIGHT_ADMIN: "flightAdmin",
  CAR_ADMIN: "carAdmin",
  ADMIN: "admin",
  USER: "user",
};

const initialState = {
  LoggedInUser: {},
  AllUsers: [
    {
      FirstName: "Zivojin",
      LastName: "Misic",
      Email: "zivkozivkic@yahoo.com",
      Password: "test",
      Address: "Sove Sovine 23",
      Friends: ["thestepa@gmail.com"],
      Phone: "0635352321",
      Role: ROLES.FLIGHT_ADMIN,
    },
    {
      FirstName: "Stepa",
      LastName: "Stepanovic",
      Email: "thestepa@gmail.com",
      Password: "test",
      Address: "Zmaj Jove 13",
      Friends: ["mileta@bode.com", "zivkozivkic@yahoo.com"],
      Phone: "062214141",
      CarOrders: [],
    },
    {
      Email: "mileta@bode.com",
      Password: "test",
      FirstName: "Milojica",
      LastName: "Milovanov",
      Friends: ["thestepa@gmail.com"],
      Address: "Cika Zike 22",
      Phone: "0612114242",
      CarOrders: [],
    },
  ],
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGN_UP:
      return {
        ...state,
        AllUsers: [...state.AllUsers, payload],
      };
    case SIGN_IN:
      for (var index = 0; index < state.AllUsers.length; index++) {
        if (
          state.AllUsers[index].Email === payload.email &&
          state.AllUsers[index].Password === payload.password
        ) {
          return { ...state, LoggedInUser: state.AllUsers[index] };
        }
      }
      break;
    case LOG_OFF:
      return { ...state, LoggedInUser: { FirstName: false } };
    case CAR_ORDER_TO_PROFILE:
      for (var userIndex = 0; userIndex < state.AllUsers.length; userIndex++) {
        if (state.AllUsers[userIndex].Email === payload.userEmail) {
          var editedUser = state.AllUsers[userIndex];
          editedUser.CarOrders.push(payload.order);
          return {
            ...state,
            AllUsers: [
              ...state.AllUsers.slice(0, userIndex),
              editedUser,
              state.AllUsers.slice(userIndex),
            ],
            LoggedInUser: editedUser,
          };
        }
      }
    default:
      return state;
  }
}
