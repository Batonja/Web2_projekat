import agent from '../../app/api/agent'


export const POPULATE = "car:populateRentACarServices";


export default function populateRentACarServices() {

    return (dispatch) => {

        agent.RentACarService.list().catch(error => {
            console.log("uspelo",error)
        }).then(response => {
            var services = [];
            return dispatch({type: POPULATE, payload: response})
        })

    }
}