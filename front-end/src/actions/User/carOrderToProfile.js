export const CAR_ORDER_TO_PROFILE = 'car:carOrderToProfile';

export default  function carOrderToProfile(order, userEmail){
    return (dispatch) =>{
        dispatch({
            type:CAR_ORDER_TO_PROFILE,
            payload: 
            { 
                order,
                userEmail
            }
        })
    }

}
