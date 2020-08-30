import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const RESERVE_SEATS = "flight:reserveSeats";

// -1 => za FastReservation, 0 => rezervacija u procesu (secondary), 1 => slobodno, 2 => rezevisano (disabled)
export default function reserveSeats(order, passengers, airlineId, flightId) {
  return (dispatch) => {
    //var reserveAllSeats = seats;
    dispatch(loadingData());
    axios
      .post(ConnectTo + "airline/orderFlight", order)
      .then((response) => {
        return response.data.errorCode == 200
          ? (dispatch({
              type: RESERVE_SEATS,
              payload: {
                passengers: passengers,
                airlineId: airlineId,
                flightId: flightId,
              },
            }),
            dispatch(finishedLoading()))
          : (toast.error("Error while trying to reserve seat"),
            dispatch(finishedLoading()));
      })
      .catch((exception) => {
        toast.error("ReserveSeatsException: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
