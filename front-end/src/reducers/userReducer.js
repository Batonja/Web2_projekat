import { SIGN_IN } from "../actions/User/signIn";
import { SIGN_UP } from "../actions/User/signUp";
import { LOG_OFF } from "../actions/User/logOff";
import { ORDER_FLIGHT } from "../actions/User/orderFlight";
import { CAR_ORDER_TO_PROFILE } from "../actions/User/carOrderToProfile";
import { ADD_FRIEND_TO_LIST } from "../actions/User/addFriend"

export const ROLES = {
  FLIGHT_ADMIN: "flightAdmin",
  CAR_ADMIN: "carAdmin",
  ADMIN: "admin",
  USER: "user",
};

const initialState = {
  LoggedInUser: {
    Id: 1,
    FirstName: "Stepa",
    LastName: "Stepanovic",
    Email: "thestepa@gmail.com",
    Password: "test",
    Address: "Zmaj Jove 13",
    Friends: ["mileta@bode.com",],
    Phone: "062214141",
    FlightOrders: [],
    CarOrders: [],
  },
  AllUsers: [
    {
      Id: 1,
      FirstName: "Zivojin",
      LastName: "Misic",
      Email: "zivkozivkic@yahoo.com",
      Password: "test",
      Address: "Sove Sovine 23",
      Friends: ["thestepa@gmail.com"],
      Phone: "0635352321",
      Role: ROLES.FLIGHT_ADMIN,
      FlightOrders: [],
    },
    {
      Id: 2,
      FirstName: "Stepa",
      LastName: "Stepanovic",
      Email: "thestepa@gmail.com",
      Password: "test",
      Address: "Zmaj Jove 13",
      Friends: ["mileta@bode.com",],
      Phone: "062214141",
      FlightOrders: [],
      CarOrders: [],
      Role: ROLES.USER
    },
    {
      Id: 3,
      Email: "mileta@bode.com",
      Password: "test",
      FirstName: "Milojica",
      LastName: "Milovanov",
      Friends: ["thestepa@gmail.com"],
      Address: "Cika Zike 22",
      Phone: "0612114242",
      FlightOrders: [],
      CarOrders: [],
      Role: ROLES.USER
    },
    {
      Id: 4,
      Email: "jovan@bode.com",
      Password: "test",
      FirstName: "Jovan",
      LastName: "Jovanovski",
      Friends: ["jovaKing@gmail.com"],
      Address: "Cika Jove 22",
      Phone: "066465874",
      FlightOrders: [],
      CarOrders: [],
      Role: ROLES.USER
    },
    {
      Id: 5,
      Email: "relja@bode.com",
      Password: "test",
      FirstName: "Relja",
      LastName: "Reljic",
      Friends: ["jovaKing@gmail.com"],
      Address: "Cika Jove 22",
      Phone: "066465874",
      FlightOrders: [],
      CarOrders: [],
      Role: ROLES.USER
    },
  ],
  ROLES: {
    FLIGHT_ADMIN: "flightAdmin",
    CAR_ADMIN: "carAdmin",
    ADMIN: "admin",
    USER: "user",
  }
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ORDER_FLIGHT:
      for (var userIndex = 0; userIndex < state.AllUsers.length; userIndex++) {
        if (state.AllUsers[userIndex].Email === payload.userEmail) {
          var editedUser = state.AllUsers[userIndex];

          editedUser.FlightOrders.push(payload.order);

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
      case ADD_FRIEND_TO_LIST:
        console.log(payload)
        for (var userIndex = 0; userIndex < state.AllUsers.length; userIndex++) {
          if (state.AllUsers[userIndex].Email === payload.userEmail) {
            var editedUser = state.AllUsers[userIndex];
            
            editedUser.Friends.push(payload.FriendsEmail);
            console.log(editedUser.Friends)
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
