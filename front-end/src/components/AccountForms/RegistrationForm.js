import React, { Component, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from '@material-ui/core/styles'

import signUp from "../../actions/User/signUp";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import userAvatar from './add-account.png'
import { UserRegistration } from "app/models/user";

const styles = (theme) => ({
  register: {
    marginTop: "50px",
    with: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

  },
  registerForm: {
    display: 'flex',
    flexDirection: 'column',
    width: "100%",
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    //margin: '5px 5px 5px 5px',
  },
  registerHeader: {
    //textAlign: 'center'
  },
  registerFormField: {
    margin: '5px 5px 5px 5px',
    width: "300px"
  },
  registerButton: {
    width: '50%',
    [theme.breakpoints.down("xs", "sm", "md", "lg")]: {
      width: "70%",

    },
    margin: '10px 10px 10px 10px',
  },
  socialsRegister: {

    display: 'flex',
    justifyContent: 'center',
    width: "100%",
  },
  socialsregisterModal: {
    [theme.breakpoints.down("xs", "sm", "md")]: {
      width: "90%",

    },
    display: 'flex',
    width: "30%",
    height: '100px',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    background: "#C4C4C4",
    border: '2px solid black',
    borderRadius: '30px',
  },
  socialButton: {
    fontSize: '30px',
    width: '150px',
    height: "40px",
    textAlign: 'center',

  },
  logoImgDiv: {
    width: "100%",
    height: '30vh'
  },
  logoImg: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
})



const RegistrationForm = (props) => {
  const { classes } = props
  const [state, setState] = useState({user:
     {
    userName: "",
    email: "",
    passportID: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    image: ""
  }});
 
  
  
  useEffect(() => {

    const regexLettersOnly = /[^A-Za-z]+/;
    const regexNotANumber = /[^0-9]/;
    const regexBigLetters = /[A-Z]/
    const regexSmallLetters = /[a-z]/
    const regexNumbers = /[0-9]/
    const regexNonAlphanumeric = /[^a-zA-Z0-9]/

 
    //Password
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      console.log(value,state.user.password)
      if (value !== state.user.password) {
        return false;
    }
    return true;
    });
    
    ValidatorForm.addValidationRule("containsBigLettersSmallLettersAndNonAlphanumeric", (value) => {
      return regexNumbers.test(value) && regexBigLetters.test(value) && regexSmallLetters.test(value) && regexNonAlphanumeric.test(value) ? true : false;
    });

    //First nad Last name
    ValidatorForm.addValidationRule("areLettersOnly", (value) => {
      return regexLettersOnly.test(value) ? false : true;
    });
    //Phone number
    ValidatorForm.addValidationRule("areNumbersOnly", (value) => {
      return regexNotANumber.test(value)  ? false : true;
    });

    //PassportID
    ValidatorForm.addValidationRule("passportLengthCheck", (value) => {
      return (value.length >= 6 && value.length  <= 9)  ? true : false;
    });

  }, [])



  const handleSubmit = () => {

    props.OnSignUp(new UserRegistration(state.user.userName,state.user.email,state.user.passportID,state.user.phoneNumber,state.user.password,state.user.firstName,state.user.lastName,null), props.history);

  };

  const handleChange = (e) => {
    console.log(e.target.value)
    const { user } = state;
    user[e.target.name] = e.target.value;
    setState({ user });
  };
  useEffect(() => {

    return () => {
     ValidatorForm.removeValidationRule("isPasswordMatch");
     ValidatorForm.removeValidationRule("areLettersOnly");
     ValidatorForm.removeValidationRule("areNumbersOnly");
     ValidatorForm.removeValidationRule("containsBigLettersSmallLettersAndNonAlphanumeric");
     ValidatorForm.removeValidationRule("passportLengthCheck");
 
    }
  },[props])



  return props.loading ? (
    <CircularProgress />
  ) : (
    <div className={classes.register}>

      <div className={classes.registerForm}>
        <div className={classes.logoImgDiv}>
          <img className={classes.logoImg} src={userAvatar} />
        </div>
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={(errors) => console.log(errors)}
        >
          <br />
          <TextValidator
            className={classes.registerFormField}
            margin="normal"
            label="Email"
            onChange={handleChange}
            id="email-form"
            name="email"
            value={state.user.email}
            validators={["required", "isEmail"]}
            errorMessages={[
              "this field is required",
              "email is not valid",
              
            ]}
          />
          <br />
          <TextValidator
            className={classes.registerFormField}
            margin="normal"
            label="Password"
            type="password"
            onChange={handleChange}
            id="password-form"
            name="password"
            value={state.user.password}
            validators={["required", "containsBigLettersSmallLettersAndNonAlphanumeric"]}
            errorMessages={
              ["This field is required.",
               "Password need to contains big and small letters, number and non alphanumeric.",
               ]}
          />
          <br />
          <TextValidator
            className={classes.registerFormField}
            margin="normal"
            label="Repeat Password"
            type="password"
            name="repeatPassword"
            onChange={handleChange}
            id="password-form-confirm"
            value={state.user.repeatPassword}
            validators={["isPasswordMatch", "required"]}
            errorMessages={[
              "Password mismatch.", 
              "This field is required."
              ]}
          />
          <br />
          <TextValidator
            className={classes.registerFormField}
            margin="normal"
            label="First Name"
            onChange={handleChange}
            id="firstname-form"
            name="firstName"
            value={state.user.firstName}
            validators={["required", "areLettersOnly"]}
            errorMessages={[
              "This field is required",
              "First name must consist of letters only.",
            ]}
          />
          <br />
          <TextValidator
            className={classes.registerFormField}
            margin="normal"
            label="Last Name"
            onChange={handleChange}
            id="lastname-form"
            name="lastName"
            value={state.user.lastName}
            validators={["required", "areLettersOnly"]}
            errorMessages={[
              "This field is required.",
              "Last name must consist of letters only.",
            ]}
          />
          <br />
          <TextValidator
            className={classes.registerFormField}
            margin="normal"
            label="Phone Number"
            onChange={handleChange}
            id="phonenumber-form"
            name="phoneNumber"
            value={state.user.phoneNumber}
            validators={["required", "areNumbersOnly"]}
            errorMessages={["This field is required.", "Phone number must contains of numbers only."]}
          />

          <br />
          <TextValidator
            className={classes.registerFormField}
            margin="normal"
            label="Passport Id"
            onChange={handleChange}
            id="passportId-form"
            name="passportID"
            value={state.user.passportID}
            validators={["required", "areNumbersOnly","passportLengthCheck"]}
            errorMessages={["This field is required", "PassportID is must contains numbers only [6-9]","PassportID is must have 6-9 characters."]}
          />
          <br />
          <Button className={classes.registerButton} onSubmit={handleSubmit} type="submit" variant="contained" color="primary">
            Register
                </Button>


        </ValidatorForm>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => ({

  loading: state.loadingReducer.loading,
});

const mpaDispatchToProps = (dispatch) => ({
  OnSignUp: (user, history) => dispatch(signUp(user, history)),
});

// @ts-ignore
export default connect(mapStateToProps, mpaDispatchToProps)(withStyles(styles)(RegistrationForm));
