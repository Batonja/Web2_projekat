import {SEARCH_AVAILABLE} from "actions/Renting/searchAvailableCars"
import {CREATE_RENTING} from "actions/Renting/createRenting"
const initialState = {
    AvailableCars: []

}


export default function rentingReducer(state = initialState, {type, payload}) {

    switch (type) {
        case SEARCH_AVAILABLE:
            
            return {...state, AvailableCars: payload}
        break;
        case CREATE_RENTING:
            console.log(CREATE_RENTING)
            return {...state, AvailableCars: []};
        default:
            return state;
    }
}
