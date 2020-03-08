const initialState = {
  airlines: [
    {
      Title: "Batijeva avio kompanija",
      Address: "Generala Batija 34",
      Description:
        "Bati napravio avio kompaniju da nudi masi karte po jeftinoj ceni",
      Destinations: ["Kairo", "NYC", "Brazilia"],
      Flights: [
        {
          From: "Kairo",
          To: "NYC",
          DepartureDate: "3/7/2020 8:01 PM",
          ArivalDate: "3/9/2020 9:00PM",
          TripLength: 3,
          ChangeOvers: ["London", "Dubai"],
          Price: 400
        },
        {
          From: "Brazilia",
          To: "Kairo",
          DepartureDate: "3/10/2020 8:01 PM",
          ArivalDate: "3/12/2020 9:00PM",
          TripLength: 3,
          ChangeOvers: ["Dubai"],
          Price: 600
        }
      ],
      Tickets: [
        ["Economy", 10],
        ["Business", 0]
      ],
      PlaneSeats: [0, 0],
      Luggage: [
        { Price: 0, Type: "Hand" },
        { Price: 20, Type: "Checked" }
      ]
    },
    {
      Title: "Damirova avio kompanija",
      Address: "Vojvode Misica 35",
      Description:
        "Damirova kompanija za bezbedan i siguran let uz specijalne pogodnosti",
      Destinations: ["Milan", "Pariz", "Brazilia"],
      Flights: [
        {
          From: "Milan",
          To: "Brazillia",
          DepartureDate: "3/3/2020 8:01 PM",
          ArivalDate: "3/12/2020 9:00PM",
          TripLength: 3,
          ChangeOvers: ["Birmingham", "Georgia"],
          Price: 400
        },
        {
          From: "Pariz",
          To: "Milan",
          DepartureDate: "3/5/2020 8:01 PM",
          ArivalDate: "3/11/2020 9:00PM",
          TripLength: 3,
          ChangeOvers: ["Birmingham", "Georgia"],
          Price: 550
        }
      ],
      Tickets: [
        ["Economy", 15],
        ["Business", 2]
      ],
      PlaneSeats: [0, 0, 0, 0],
      Luggage: [
        { Price: 0, Type: "Hand" },
        { Price: 40, Type: "Checked" }
      ]
    }
  ]
};

export default function flightReducer(state = initialState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
