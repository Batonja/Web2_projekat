const initialState = {
  LoggedInUser: {
    FirstName: "Stepa",
    LastName: "Stepanovic",
    Email: "thestepa@gmail.com",
    Password: "test",
    Address: "Zmaj Jove 13",
    Friends: ["mileta@bode.com", "zivkozivkic@yahoo.com"],
    Phone: "062214141",
  },
  AllUsers: [
    {
      FirstName: "Zivojin",
      LastName: "Misic",
      Email: "zivkozivkic@yahoo.com",
      Password: "test",
      Address: "Sove Sovine 23",
      Phone: "0635352321",
    },
    {
      FirstName: "Stepa",
      LastName: "Stepanovic",
      Email: "thestepa@gmail.com",
      Password: "test",
      Address: "Zmaj Jove 13",
      Friends: ["mileta@bode.com", "zivkozivkic@yahoo.com"],
      Phone: "062214141",
    },
    {
      Email: "mileta@bode.com",
      Password: "test",
      FirstName: "Milojica",
      LastName: "Milovanov",
      Friends: ["thestepa@gmail.com"],
      Address: "Cika Zike 22",
      Phone: "0612114242",
    },
  ],
};

export default function userReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        AllUsers: [...state.AllUsers, action.payload],
      };
    default:
      return state;
  }
}
