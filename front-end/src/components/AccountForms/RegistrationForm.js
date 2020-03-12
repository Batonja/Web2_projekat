import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles({
  centerDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  headerStyle: {
    color: "#1976D2",
    fontSize: "30px"
  },
  textField: {
    width: 300
  }
});

const RegistrationForm = () => {
  const classes = new useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    let user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber
    };
    //SEND USER TO DATABASE

    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setPhoneNumber("");
  };

  const handleChange = e => {
    //  reset errors and validation as well

    const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/; // trazi npr ime@provider.com
    const regexLettersOnly = /[^A-Za-z]+/;
    const regexNotANumber = /[^0-9]/;
    const regexLettersSpaceNumbers = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    if (e.target.id === "email-form") {
      if (!regexEmail.test(e.target.value)) {
        //Trigger error message for email
      }

      setEmail(e.target.value);
    } else if (e.target.id === "password-form") {
      setPassword(e.target.value);
    } else if (e.target.id === "password-form-confirm") {
      setPasswordConfirm(e.target.value);
    } else if (e.target.id === "firstname-form") {
      if (regexLettersOnly.test(e.target.value)) {
        //Triger error message for firstName
      }
      setFirstName(e.target.value);
    } else if (e.target.id === "lastname-form") {
      if (regexLettersOnly.test(e.target.value)) {
        //Triger error message for lastName
      }
      setLastName("e.target.value");
    } else if (e.target.id === "phonenumber-form") {
      if (regexNotANumber.test(e.target.id)) {
        //Trigger error messag for phoneNumber
      }
      setPhoneNumber(e.target.value);
    } else if (e.target.id === "address-form") {
      if (!regexLettersSpaceNumbers.test(e.target.value)) {
        //Trigger error message for address
      }

      setAddress(e.target.value);
    } else {
      //MISSED TEXTFIELD
    }
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  }, []);

  return (
    <div>
      <h1>Sign up</h1>
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={errors => console.log(errors)}
      >
        <div className="row">
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Email"
              onChange={handleChange}
              id="email-form"
              name="email"
              value={email}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Password"
              type="password"
              onChange={handleChange}
              id="password-form"
              name="password"
              value={password}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Repeat Password"
              type="password"
              name="repeatPassword"
              onChange={handleChange}
              id="password-form-confirm"
              value={passwordConfirm}
              validators={["isPasswordMatch", "required"]}
              errorMessages={["password mismatch", "this field is required"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="First Name"
              onChange={handleChange}
              id="firstname-form"
              name="firstname"
              value={firstName}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Last Name"
              onChange={handleChange}
              id="lastname-form"
              name="lastName"
              value={lastName}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Phone Number"
              onChange={handleChange}
              id="phonenumber-form"
              name="phoneNumber"
              value={phoneNumber}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Address"
              onChange={handleChange}
              id="address-form"
              name="address"
              value={address}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className={classes.centerDiv}>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </div>
        </div>
        <br />
      </ValidatorForm>
    </div>
  );
};

export default RegistrationForm;
