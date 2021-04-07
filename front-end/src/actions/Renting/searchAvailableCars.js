import agent from '../../app/api/agent'


export const SEARCH_AVAILABLE = "renting:populateRentACarServices";


export default function searchAvailableCars(searchParametars) {

    return (dispatch) => {
        
        agent.Renting.availableVehicles(searchParametars).catch(error => {
            console.log("ERROR",error)
        }).then(response => {
            
            
            return dispatch({type: SEARCH_AVAILABLE, payload: response})
        })

    }
}