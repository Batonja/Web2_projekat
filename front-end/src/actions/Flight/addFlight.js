import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const ADD_FLIGHT = "flight:addFlight";

export default function addFlight(flight) {
  return (dispatch) => {
    dispatch(loadingData());
    axios
      .post(ConnectTo + "airline/addFlight", {
        ToDestionation: flight.toDestination,
        FromDestination: flight.fromDestination,
        DepartureDate: flight.departureDate,
        ArrivalDate: flight.arrivalDate,
        TripLength: flight.tripLength,
        NumOfChangeovers: flight.numOfChangeovers,
        Airline: flight.airline,
        Tickets: flight.tickets,
      })
      .then((response) => {
        return response.data.errorCode === 200
          ? (dispatch({ type: ADD_FLIGHT, payload: response.data }),
            toast.dark("Flight added successfully"),
            dispatch(finishedLoading()))
          : (toast.error("AddFlightError: " + response.data.description),
            dispatch(finishedLoading()));
      })
      .catch((exception) => {
        toast.error("AddFlightException: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
