export const ADD_FRIEND_TO_LIST = 'user:addFriend';


export default  function addFriend(FriendsEmail, userEmail){
    return (dispatch) =>{
        dispatch({
            type:ADD_FRIEND_TO_LIST,
            payload: 
            { 
                FriendsEmail,
                userEmail
            }
        })
    }

}

