// @ts-nocheck
import React, { Component, useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import signIn from "../../actions/User/signIn";
import GoogleLogin from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import agent from "../../app/api/agent"
import { UserLogin } from '../../app/models/user'
import userAvatar from '../../logo.png'
import { Divider } from "material-ui";
import fbSignIn from "actions/User/fbSignIn";
import FacebookIcon from '@material-ui/icons/Facebook';

const styles = (theme) => ({
  signInPage:{
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  signIn: {
    width: "40%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  signInForm: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    background: "#a6b2dd",
    borderRadius: "10px",
    marginTop: "40px"
  },
  signInHeader: {
    //textAlign: 'center'
  },
  signInFormField: {
    margin: "5px 5px 5px 5px",
    width: "300px",
    textColor: "white"

  },
  loginButton: {
    width: "50%",
    [theme.breakpoints.down("xs", "sm", "md", "lg")]: {
      width: "70%",
    },
    margin: "10px 10px 10px 10px",
  },
  socialsLogin: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  socialsLoginModal: {
    [theme.breakpoints.down("xs", "sm", "md")]: {
      width: "90%",
    },
    display: "flex",
    width: "30%",
    height: "100px",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    background: "#C4C4C4",
    border: "2px solid black",
    borderRadius: "30px",
  },
  socialButton: {
    fontSize: "30px",
    width: "150px",
    height: "40px",
    textAlign: "center",
    margin: "0 0 0 30px"
  },
  logoImgDiv: {
    marginTop: "50px",
    width: "100%",
    height: "30vh",
    margin: "0 30px 0 30px"
  },
  logoImg: {
    
    maxWidth: "100%",
    maxHeight: "100%",
  },
});



const LoginForm = (props) => {

  const { classes } = props

  const [state, setState] = useState(new UserLogin("", ""));

  useEffect(() => {
    setState(new UserLogin("", ""))
  }, [])

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {


    props.OnLogIn(
      state.email,
      state.password,
      props.history
    );
  }

  const handleFBLogin = () => {
    //  if(window.FB != undefined)
    props.fbLogin()
  }


  return (
    <div className={classes.signInPage}>
      <div className={classes.signIn}>
        <div className={classes.signInForm}>
          <div className={classes.logoImgDiv}>
            <img alt='User Avatar Image' className={classes.logoImg} src={userAvatar} />
          </div>
          <ValidatorForm onError={(errors) => console.log(errors)}>
            <TextValidator
              className={classes.signInFormField}
              label="Email"
              id="email-form"
              name="email"
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
              onChange={handleChange}
            />
            <br />
            < TextValidator
              className={classes.signInFormField}
              label="Password"
              type="password"
              id="password-form"
              name="password"
              style={{ color: "white" }}
              validators={["required"]}
              errorMessages={["Password field is required"]}
              onChange={handleChange}
            />
            <br />

            <div className="signInBtn">
              <Button
                className={classes.loginButton}
                disabled={(state.email === "" || state.password == "")}
                variant="contained"
                id="searchButton"
                onClick={handleSubmit}
                color="primary"
              >
                Log In
              </Button>
            </div>
          </ValidatorForm>
          <hr style={{ background: "lightgray", height: "2px", width: "300px" }} />
          <Button

            color="primary"
            style={{ width: "40%", margin: "0 0 10px 0" }}
            onClick={handleFBLogin}
          ><FacebookIcon />  Login</Button>
        </div>



      </div>
    </div>

  );
}



const mapDispatchToProps = (dispatch) => ({
  OnLogIn: (email, password, history) => dispatch(signIn(email, password, history)),
  fbLogin: () => dispatch(fbSignIn())
});

// @ts-ignore
export default connect(null, mapDispatchToProps)(withStyles(styles)(LoginForm));
