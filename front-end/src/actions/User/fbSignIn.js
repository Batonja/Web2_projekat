import agent from '../../app/api/agent'


export const FB_SIGN_IN = "user:fbSignIn";


export default function fbSignIn() {

    return (dispatch) => {

        if (window.FB != undefined)
            window.FB.login(response => {
                console.log(response)
                agent.User.fbLogin(response.authResponse.accessToken)
                    .catch(error => {
                        console.log("Error while trying login with FB", error)
                    }) 
                    .then(user => {
                        console.log(user);
                    })
            }, { scope: 'email' })
        else
            console.log("Please use Chrome")

    }
}