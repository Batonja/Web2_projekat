const initialState = {
  LoggedInUser: {
    Email: "mileta@bode.com",
    Name: "Milojica",
    Friends: ["thestepa@gmail.com"]
  },
  AllUsers: [
    {
      Name: "Zivojin",
      LastName: "Misic",
      Email: "zivkozivkic@yahoo.com",
      Address: "Sove Sovine 23",
      Phone: "0635352321"
    },
    {
      Name: "Stepa",
      LastName: "Stepanovic",
      Email: "thestepa@gmail.com",
      Address: "Zmaj Jove 13",
      Friends: ["mileta@bode.com", "zivkozivkic@yahoo.com"],
      Phone: "062214141"
    },
    {
      Email: "mileta@bode.com",
      Name: "Milojica",
      LastName: "Milovanov",
      Friends: [{ Name: "Stepa", Email: "thestepa@gmail.com" }],
      Address: "Cika Zike 22",
      Phone: "0612114242"
    }
  ]
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
