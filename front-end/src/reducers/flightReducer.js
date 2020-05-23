import { RESERVE_SEATS } from "../actions/Flight/reserveSeats";
import { SEARCH } from "../actions/Flight/search";
import { FILTER } from "../actions/Flight/filter";
import { EDIT_AIRLINE } from "../actions/Flight/editAirline";
import { ADD_AIRLINE } from "../actions/Flight/addAirline";
import { GET_FLIGHT_LUGGAGE } from "../actions/Flight/getFlightLuggage";
import { GET_AIRLINES } from "../actions/Flight/getAirlines";
import { GET_DESTINATIONS } from "../actions/Flight/getDestinations";
import {ADD_FLIGHT} from "../actions/Flight/addFlight"
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
    case ADD_FLIGHT:
      return {...state}

    case GET_DESTINATIONS:
      return { ...state, allDestinations: payload };
    case GET_AIRLINES:
      return { ...state, allAirlines: payload };

    case GET_FLIGHT_LUGGAGE:
      return { ...state, flightLuggage: payload };

    case ADD_AIRLINE:
      var airlines = state.allAirlines;
      airlines.push(payload.airline);
      return { ...state, allAirlines: airlines };

    case EDIT_AIRLINE:
      var indexOfAirlineToChange = -1;
      var airlineToChange = -1;
      for (
        var indexOfAirline = 0;
        indexOfAirline < state.allAirlines.length;
        indexOfAirline++
      ) {
        if (state.allAirlines[indexOfAirline].Id === payload.airline.Id) {
          indexOfAirlineToChange = indexOfAirline;
          airlineToChange = cloneDeep(state.allAirlines[indexOfAirline]);
          airlineToChange.Title = payload.airline.Title;
          airlineToChange.Address = payload.airline.Address;
          airlineToChange.Description = payload.airline.Description;
          airlineToChange.Tickets.Economy = payload.airline.Tickets.Economy;
          airlineToChange.Tickets.Business = payload.airline.Tickets.Business;
          for (
            var indexOfFlight = 0;
            indexOfFlight < airlineToChange.Flights.length;
            indexOfFlight++
          ) {
            if (
              airlineToChange.Flights[indexOfFlight].Id ===
              payload.airline.Flight.Id
            ) {
              airlineToChange.Flights[indexOfFlight].From =
                payload.airline.Flight.From;
              airlineToChange.Flights[indexOfFlight].To =
                payload.airline.Flight.To;
              airlineToChange.Flights[indexOfFlight].DepartureDate =
                payload.airline.Flight.DepartureDate;
              airlineToChange.Flights[indexOfFlight].ArivalDate =
                payload.airline.Flight.ArivalDate;
              airlineToChange.Flights[indexOfFlight].TripLength =
                payload.airline.Flight.TripLength;

              if (
                airlineToChange.Flights[indexOfFlight].Seats.length >
                payload.airline.Flight.Seats.length
              ) {
                var lastSeatIndex =
                  airlineToChange.Flights[indexOfFlight].Seats.length - 1;
                airlineToChange.Flights[
                  indexOfFlight
                ].Passengers = airlineToChange.Flights[
                  indexOfFlight
                ].Passengers.filter(
                  (passenger) => passenger.SeatId !== lastSeatIndex
                );
              }
              airlineToChange.Flights[indexOfFlight].Seats =
                payload.airline.Flight.Seats;
              airlineToChange.Flights[indexOfFlight].Price =
                payload.airline.Flight.Price;
            }
          }
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
      var airlinesToDisplay = [];

      for (
        var indexOfAirline = 0;
        indexOfAirline < state.airlines.length;
        indexOfAirline++
      ) {
        var currentAirlineWithoutFlights = cloneDeep(
          state.airlines[indexOfAirline]
        );
        currentAirlineWithoutFlights.Flights = [];
        for (
          var indexOfFlight = 0;
          indexOfFlight < state.airlines[indexOfAirline].Flights.length;
          indexOfFlight++
        ) {
          for (
            var indexOfSelectedTripLength = 0;
            indexOfSelectedTripLength < payload.selectedTripLengths.length;
            indexOfSelectedTripLength++
          ) {
            switch (
              payload.selectedTripLengths[indexOfSelectedTripLength].value
            ) {
              case 0:
                var tripLengthFloat = parseFloat(
                  state.airlines[indexOfAirline].Flights[indexOfFlight]
                    .TripLength
                );
                if (tripLengthFloat < 1.0) {
                  currentAirlineWithoutFlights.Flights.push(
                    state.airlines[indexOfAirline].Flights[indexOfFlight]
                  );
                }
                break;

              case 1:
                if (
                  parseFloat(
                    state.airlines[indexOfAirline].Flights[indexOfFlight]
                      .TripLength
                  ) >= 1.0 &&
                  parseFloat(
                    state.airlines[indexOfAirline].Flights[indexOfFlight]
                      .TripLength
                  ) <= 5.0
                ) {
                  currentAirlineWithoutFlights.Flights.push(
                    state.airlines[indexOfAirline].Flights[indexOfFlight]
                  );
                }
                break;

              case 2:
                if (
                  parseFloat(
                    state.airlines[indexOfAirline].Flights[indexOfFlight]
                      .TripLength
                  ) > 5.0
                ) {
                  currentAirlineWithoutFlights.Flights.push(
                    state.airlines[indexOfAirline].Flights[indexOfFlight]
                  );
                }
                break;
            }
          }
        }

        var passedAirlineTitleFilter = true;
        for (
          var indexOfFilteredAirline = 0;
          indexOfFilteredAirline < payload.selectedAirlines.length;
          indexOfFilteredAirline++
        ) {
          if (
            currentAirlineWithoutFlights.Id ===
            payload.selectedAirlines[indexOfFilteredAirline].value
          ) {
            if (payload.selectedTripLengths.length === 0) {
              currentAirlineWithoutFlights.Flights =
                state.airlines[indexOfAirline].Flights;
            }
          } else {
            passedAirlineTitleFilter = false;
          }
        }
        if (
          passedAirlineTitleFilter &&
          currentAirlineWithoutFlights.Flights.length > 0
        ) {
          airlinesToDisplay.push(currentAirlineWithoutFlights);
        }
      }

      if (
        payload.selectedTripLengths.length === 0 &&
        payload.selectedAirlines.length === 0
      ) {
        airlinesToDisplay = -1;
      }

      return { ...state, filteredAirlines: airlinesToDisplay };

    case SEARCH:
      var airlinesToDisplay = [];
      for (
        var indexOfAirline = 0;
        indexOfAirline < state.allAirlines.length;
        indexOfAirline++
      ) {
        var currentAirlineWithoutFlights = cloneDeep(
          state.allAirlines[indexOfAirline]
        );

        currentAirlineWithoutFlights.Flights = [];
        for (
          var indexOfFlight = 0;
          indexOfFlight < state.allAirlines[indexOfAirline].Flights.length;
          indexOfFlight++
        ) {
          var currentFlight =
            state.allAirlines[indexOfAirline].Flights[indexOfFlight];

          if (
            currentFlight.To === payload.destination ||
            payload.destination === ""
          ) {
            if (
              (currentFlight.Price -
                currentAirlineWithoutFlights.Tickets.Business >=
                payload.ticketPrice[0] &&
                currentFlight.Price -
                  currentAirlineWithoutFlights.Tickets.Business <=
                  payload.ticketPrice[1]) ||
              (currentFlight.Price -
                currentAirlineWithoutFlights.Tickets.Economy >=
                payload.ticketPrice[0] &&
                currentFlight.Price -
                  currentAirlineWithoutFlights.Tickets.Economy <=
                  payload.ticketPrice[1])
            ) {
              if (
                currentFlight.DepartureDate === payload.departureDate &&
                currentFlight.ArivalDate === payload.arrivalDate
              ) {
                currentAirlineWithoutFlights.Flights.push(currentFlight);
              }
            }
          }
        }
        if (currentAirlineWithoutFlights.Flights.length > 0) {
          var airlineToPush = currentAirlineWithoutFlights;
          airlinesToDisplay.push(airlineToPush);
        }
      }
      return { ...state, airlines: airlinesToDisplay };

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
      }
      break;

    default:
      if (state.airlines === undefined)
        return { ...state, airlines: state.allAirlines };
      return state;
  }
}
