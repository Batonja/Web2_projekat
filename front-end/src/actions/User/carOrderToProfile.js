export const CAR_ORDER_TO_PROFILE = 'car:carOrderToProfile';

export const carOrderToProfile = (order, userEmail) => {
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
