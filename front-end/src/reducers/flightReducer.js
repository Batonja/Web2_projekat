import { RESERVE_SEATS } from "../actions/Flight/reserveSeats";
import { SEARCH } from "../actions/Flight/search";
import { FILTER } from "../actions/Flight/filter";
import { EDIT_AIRLINE } from "../actions/Flight/editAirline";
import { ADD_AIRLINE } from "../actions/Flight/addAirline";
import { GET_FLIGHT_LUGGAGE } from "../actions/Flight/getFlightLuggage";
import { GET_AIRLINES } from "../actions/Flight/getAirlines";
import { GET_DESTINATIONS } from "../actions/Flight/getDestinations";
import { ADD_FLIGHT } from "../actions/Flight/addFlight";
import { GET_FLIGHT_ORDERS } from "../actions/Flight/getFlightOrders";
import { DELETE_ORDER } from "../actions/Flight/deleteOrder";
import { CONFIRM_ORDER } from "../actions/Flight/confirmOrder";

import cloneDeep from "lodash/cloneDeep";

const initialState = {
  allAirlines: [
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
          DepartureDate: "07/03/2020",
          ArivalDate: "09/03/2020",
          TripLength: "0.5",
          ChangeOvers: ["London", "Dubai"],
          Price: 400,
          Seats: [1],
          Passengers: [],
        },
        {
          Id: 2,
          From: "Brazilia",
          To: "Kairo",
          DepartureDate: "03/10/2020",
          ArivalDate: "03/12/2020",
          TripLength: "3.5",
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
          DepartureDate: "03/03/2020",
          ArivalDate: "03/12/2020",
          TripLength: "5.5",
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
          DepartureDate: "03/05/2020",
          ArivalDate: "03/11/2020",
          TripLength: "3.5",
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
  flightLuggage: [],
  filteredAirlines: -1,
  allDestinations: [],
};

export default function flightReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CONFIRM_ORDER:
      var confirmedFlightOrders = state.confirmedFlightOrders.concat(
        state.unconfirmedFlightOrders.filter(
          (order) => order.flightOrderId === payload
        )
      );
      var unconfirmedFlightOrders = state.unconfirmedFlightOrders.filter(
        (order) => order.flightOrderId !== payload
      );

      return {
        ...state,
        confirmedFlightOrders: confirmedFlightOrders,
        unconfirmedFlightOrders: unconfirmedFlightOrders,
      };

    case DELETE_ORDER:
      var flightOrders = state.allFlightOrders;
      var confirmedFlightOrders = state.confirmedFlightOrders;
      var unconfirmedFlightOrders = state.unconfirmedFlightOrders;
      if (
        confirmedFlightOrders.some((order) => order.flightOrderId === payload)
      ) {
        confirmedFlightOrders.filter(
          (order) => order.flightOrderId !== payload
        );
      } else
        unconfirmedFlightOrders.filter(
          (order) => order.flightOrderId !== payload
        );

      return {
        ...state,
        confirmedFlightOrders: confirmedFlightOrders,
        unconfirmedFlightOrders: unconfirmedFlightOrders,
      };

    case GET_FLIGHT_ORDERS:
      var confirmedFlightOrders = payload.filter(
        (order) => order.confirmed === true
      );
      var unconfirmedFlightOrders = payload.filter(
        (order) => order.confirmed === false
      );
      return {
        ...state,
        confirmedFlightOrders: confirmedFlightOrders,
        unconfirmedFlightOrders: unconfirmedFlightOrders,
      };

    case ADD_FLIGHT:
      var airlineToAddFlightTo = -1;
      var indexOfAirlineToAddFlightTo = -1;
      for (
        var indexOfAirline = 0;
        indexOfAirline < state.allAirlines.length;
        indexOfAirline++
      ) {
        if (state.allAirlines[indexOfAirline] === payload.airline.airlineId) {
          indexOfAirlineToAddFlightTo = indexOfAirline;
          airlineToAddFlightTo = state.allAirlines[indexOfAirline];
          airlineToAddFlightTo.flights.push(payload);
          break;
        }
      }

      return {
        ...state,
        allAirlines: [
          ...state.allAirlines.slice(0, indexOfAirlineToAddFlightTo),
          airlineToAddFlightTo,
          ...state.allAirlines(indexOfAirlineToAddFlightTo + 1),
        ],
        airlines: [
          ...state.airlines.slice(0, indexOfAirlineToAddFlightTo),
          airlineToAddFlightTo,
          ...state.airlines(indexOfAirlineToAddFlightTo + 1),
        ],
      };

    case GET_DESTINATIONS:
      return { ...state, allDestinations: payload };
    case GET_AIRLINES:
      return { ...state, allAirlines: payload, airlines: payload };

    case GET_FLIGHT_LUGGAGE:
      return { ...state, flightLuggage: payload };

    case ADD_AIRLINE:
      var airlines = state.allAirlines;
      airlines.push(payload);
      return { ...state, allAirlines: airlines };

    case EDIT_AIRLINE:
      var indexOfAirlineToChange = -1;
      var airlineToChange = -1;
      for (
        var indexOfAirline = 0;
        indexOfAirline < state.allAirlines.length;
        indexOfAirline++
      ) {
        if (state.allAirlines[indexOfAirline].airlineId === payload.airlineId) {
          indexOfAirlineToChange = indexOfAirline;
          airlineToChange = cloneDeep(state.allAirlines[indexOfAirline]);
          airlineToChange.title = payload.title;
          airlineToChange.address = payload.address;
          airlineToChange.description = payload.description;
          airlineToChange.airlineDestinations =
            payload.airlineDestinations === null
              ? airlineToChange.airlineDestinations
              : payload.airlineDestinations;
          airlineToChange.availableFlightLuggage =
            payload.availableFlightLuggage === null
              ? airlineToChange.availableFlightLuggage
              : payload.availableFlightLuggage;
        }
      }

      return {
        ...state,
        allAirlines: [
          ...state.allAirlines.slice(0, indexOfAirlineToChange),
          airlineToChange,
          ...state.allAirlines.slice(indexOfAirlineToChange + 1),
        ],
        airlines: [
          ...state.airlines.slice(0, indexOfAirlineToChange),
          airlineToChange,
          ...state.airlines.slice(indexOfAirlineToChange + 1),
        ],
      };

    case FILTER:
      return { ...state, airlines: payload }; // ovde je bilo filteredAirlines ispitaj

    case SEARCH:
      return { ...state, airlines: payload };

    case RESERVE_SEATS:
      for (
        var indexOfAirline = 0;
        indexOfAirline < state.airlines.length;
        indexOfAirline++
      ) {
        var editedAirline = state.airlines[indexOfAirline];
        for (
          var indexOfFlight = 0;
          indexOfFlight < state.airlines[indexOfAirline].flights.length;
          indexOfFlight++
        ) {
          if (
            state.airlines[indexOfAirline].flights[indexOfFlight].flightId ===
            payload.flightId
          ) {
            for (
              var indexOfSeat = 0;
              indexOfSeat < editedAirline.flights[indexOfFlight].length;
              indexOfSeat++
            ) {
              if (
                editedAirline.flights[indexOfFlight].seats[indexOfSeat]
                  .seatId === payload.seats[0].seatId
              ) {
                editedAirline.flights[indexOfFlight].seats[indexOfSeat] =
                  payload.seats[0];
              }
            }

            return {
              ...state,
              allAirlines: [
                ...state.allAirlines.slice(0, indexOfAirline),
                editedAirline,
                ...state.allAirlines.slice(indexOfAirline + 1),
              ],
              airlines: [
                ...state.airlines.slice(0, indexOfAirline),
                editedAirline,
                ...state.airlines.slice(indexOfAirline + 1),
              ],
            };
          }
        }
      }
      break;

    default:
      if (state.airlines === undefined)
        return { ...state, airlines: state.allAirlines };
      return state;
  }
}
