import loadingData from "../Loading/loadingData";
import axios from "axios";
import finishedLoading from "../Loading/finishedLoading";
import { ConnectTo } from "../../common/constants";
import { toast } from "react-toastify";
export const SEARCH = "flight:search";

export default function search(searchObject) {
  return (dispatch) => {
    dispatch(loadingData());

    axios
      .post(ConnectTo + "Airline/Search", searchObject)
      .then((response) => {
        dispatch({ type: SEARCH, payload: response.data });
        dispatch(finishedLoading());
      })
      .catch((exception) => {
        toast.error(
          "Error while trying to perform AirlineSearch: " + exception
        );
        dispatch(finishedLoading());
      });
  };
}
