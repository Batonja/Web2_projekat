import { RESERVE_SEATS } from "../actions/Flight/reserveSeats";
import finishedLoading from "../actions/Loading/finishedLoading";

const initialState = {
  airlines: [
    {
      Id: 0,
      Title: "Batijeva avio kompanija",
      Address: "Generala Batija 34",
      Description:
        "Bati napravio avio kompaniju da nudi masi karte po jeftinoj ceni",
      Destinations: ["Kairo", "NYC", "Brazilia"],
      Flights: [
        {
          Id: 1,
          From: "Kairo",
          To: "NYC",
          DepartureDate: "3/7/2020 8:01 PM",
          ArivalDate: "3/9/2020 9:00PM",
          TripLength: 3,
          ChangeOvers: ["London", "Dubai"],
          Price: 400,
          Seats: [1],
          Passengers: [],
        },
        {
          Id: 2,
          From: "Brazilia",
          To: "Kairo",
          DepartureDate: "3/10/2020 8:01 PM",
          ArivalDate: "3/12/2020 9:00PM",
          TripLength: 3,
          ChangeOvers: ["Dubai"],
          Price: 600,
          Seats: [
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            2,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
          ],
          Passengers: [],
        },
      ],
      Tickets: { Economy: 10, Business: 0 },
      PlaneSeatsNumber: [8, 4],
      Luggage: [
        { Price: 0, Type: "Hand" },
        { Price: 20, Type: "Checked" },
      ],
    },
    {
      Id: 1,
      Title: "Damirova avio kompanija",
      Address: "Vojvode Misica 35",
      Description:
        "Damirova kompanija za bezbedan i siguran let uz specijalne pogodnosti",
      Destinations: ["Milan", "Pariz", "Brazilia"],
      Flights: [
        {
          Id: 3,
          From: "Milan",
          To: "Brazillia",
          DepartureDate: "3/3/2020 8:01 PM",
          ArivalDate: "3/12/2020 9:00PM",
          TripLength: 3,
          ChangeOvers: ["Birmingham", "Georgia"],
          Price: 400,
          Seats: [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            0,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
          ],
          Passengers: [],
        },
        {
          Id: 4,
          From: "Pariz",
          To: "Milan",
          DepartureDate: "3/5/2020 8:01 PM",
          ArivalDate: "3/11/2020 9:00PM",
          TripLength: 3,
          ChangeOvers: ["Birmingham", "Georgia"],
          Price: 550,
          Seats: [],
          Passengers: [],
        },
      ],
      Tickets: { Economy: 15, Business: 2 },
      PlaneSeatsNumber: [6, 6],
      Luggage: [
        { Price: 0, Type: "Hand" },
        { Price: 40, Type: "Checked" },
      ],
    },
  ],
};

export default function flightReducer(state = initialState, { type, payload }) {
  switch (type) {
    case RESERVE_SEATS:
      for (
        var indexOfAirline = 0;
        indexOfAirline < state.airlines.length;
        indexOfAirline++
      ) {
        if (state.airlines[indexOfAirline].Id === payload.airlineId) {
          for (
            var indexOfFlight = 0;
            indexOfFlight < state.airlines[indexOfAirline].Flights.length;
            indexOfFlight++
          ) {
            if (
              state.airlines[indexOfAirline].Flights[indexOfFlight].Id ===
              payload.flightId
            ) {
              var editedAirline = state.airlines[indexOfAirline];
              editedAirline.Flights[indexOfFlight].Seats = payload.seats;
              editedAirline.Flights[
                indexOfFlight
              ].Passengers = editedAirline.Flights[
                indexOfFlight
              ].Passengers.concat(payload.passengers);

              return {
                ...state,
                Airlines: [
                  ...state.airlines.slice(0, indexOfAirline),
                  editedAirline,
                  state.airlines.slice(indexOfAirline),
                ],
              };
            }
          }
        }
      }
      break;
    default:
      return state;
  }
}
