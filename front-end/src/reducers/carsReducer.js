import {POPULATE} from '../actions/Cars/populateRentACar'
import {RentACarService} from '../app/models/rentACarService'

const initialState = {
    rentACarServices: []

}
export default function carsReducer(state = initialState, {type, payload}) {

    switch (type) {
        case POPULATE:
            return {...state, rentACarServices: payload}
        break;
        default:
            return state;
    }
}




