import { Button } from '@material-ui/core'
import agent from 'app/api/agent'
import React, { useState } from 'react'
import info from './info.png'
import { toast } from "react-toastify";

const VerifyEmail = (props) => {
    
    const handleVerify = () => {
        var fullPath = window.location.href;

        var path = fullPath.split('/')[4]//
        agent.User.verifyEmail(path)
    
            .catch(e => console.log(e))
            .then(response => {
                console.log(response)
                props.history.push("/signin")
                toast.success("EMAIL SUCCESSFULY VERIFIED YOU CAN LOGIN",{
                    position: toast.POSITION.BOTTOM_CENTER,
                    
                })
            })
        
    }
    return (
        <div style={{ color: "white", textAlign: "center", alignItems: "center" }}>
            <h1>Click below for verification</h1>
            <div>
                <img alt="info" src={info} ></img>
            </div>
            <Button variant="contained" style={{ color: "#ff4d07", fontWeight: "bold", backgroundColor: "#3f51b5" }} onClick={handleVerify}>Verify mail</Button>
        </div>
    )
}

export default VerifyEmail
