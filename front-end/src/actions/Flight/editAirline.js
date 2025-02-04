import axios from "axios";
import loadingData from "../Loading/loadingData";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";

export const EDIT_AIRLINE = "flight:editAirline";

export default function editAirline(airline) {
  return (dispatch) => {
    dispatch(loadingData());

    axios
      .post(ConnectTo + "airline/EditAirline", airline)
      .then((response) => {
        return response.data.errorCode === 200
          ? (dispatch({ type: EDIT_AIRLINE, payload: response.data.value }),
            dispatch(finishedLoading()))
          : (dispatch(finishedLoading()),
            toast.error(
              "Error: " +
                response.data.errorCode +
                " " +
                response.data.description
            ));
      })
      .catch((exception) => {
        toast.error("Error while trying to edit airline: " + exception.message);
        dispatch(finishedLoading());
      });
  };
}
