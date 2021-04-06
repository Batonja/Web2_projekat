import React from 'react'
import info from './info.png'

const VerificationEmailSent = () => {
    return (
        <div style={{ textAlign: "center", alignItems: "center", marginTop:"50px" }}>
            <h2 style={{ color: "white", textWidth: "bold" }}>Sucessful Registration</h2>
            <h4 style={{ color: "white", textWidth: "bold" }}>Verification email sent<br />Check your inbox to see an email confirmation link</h4>
            <div >
                <img style={{ width: "28%" }} alt="info" src={info} ></img>
            </div>


        </div>
    )
}

export default VerificationEmailSent
