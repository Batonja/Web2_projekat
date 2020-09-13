import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const GET_FLIGHT_ORDERS = "flight:getFlightOrders";

export default function getFlightOrders() {
  return (dispatch) => {
    dispatch(loadingData());

    axios
      .get(ConnectTo + "Airline/GetFlightOrders")
      .then((response) => {
        return (
          dispatch({ type: GET_FLIGHT_ORDERS, payload: response.data }),
          dispatch(finishedLoading())
        );
      })
      .catch((exception) => {
        dispatch(finishedLoading());
        toast.error("Error: " + exception.message);
      });
  };
}
