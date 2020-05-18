import axios from "axios";
import LOADING_DATA from "../Loading/loadingData";
import FINISHED_LOADING from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const ADD_AIRLINE = "flight:addAirline";

export default function addAirline(
  title,
  address,
  description,
  availableLuggages,
  availableDestinations
) {
  return (dispatch) => {
    dispatch({ type: LOADING_DATA });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Title: title,
        Address: address,
        Description: description,
        AvailableFlightLuggage: availableLuggages,
        AirlineDestinations: availableDestinations,
      }),
    };
    fetch(ConnectTo + "airline/addAirline", options)
      .then((response) => {
        return response.ok ? response.text() : null;
      })
      .then((response) => {
        return response !== null
          ? (dispatch({ type: ADD_AIRLINE, payload: response.value }),
            toast.dark("Airline added successfully"))
          : (alert("AddAirlineError: " + response),
            dispatch({ type: FINISHED_LOADING }));
      })
      .catch((exception) => {
        toast.error("AddAirlineException: " + exception.message);
      });
  };
}
