import { LOADING_DATA } from "../actions/Loading/loadingData";
import { FINISHED_LOADING } from "../actions/Loading/finishedLoading";
const initialState = {
  loading: false,
};

export default function loadingReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case LOADING_DATA:
      return { ...state, loading: payload };
    case FINISHED_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
}
