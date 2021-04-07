import agent from '../../app/api/agent'
export const CREATE_RENTING = 'renting:createRenting';

export default function createRenting(order) {
    return (dispatch) => {

        console.log(order)
        agent.Renting.create(order).
            catch(err => console.log(err))
            .then(response => {


                return dispatch({
                    type: CREATE_RENTING,
                    payload: order
                })
            })


    }

}
