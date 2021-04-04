import React from 'react'
import info from './info.png'

const VerificationEmailSent = () => {
    return (
        <div style={{color:"blue",textAlign:"center",alignItems:"center"}}>
            <div>
                <img alt ="info" src={info} ></img>
            </div>
            <h2>Sucessful Registration</h2>
            <h4>Verification email sent<br/>Check your inbox to see an email confirmation link</h4>
        </div>
    )
}

export default VerificationEmailSent
