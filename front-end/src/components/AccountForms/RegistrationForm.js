import React, { useState, useEffect } from "react";

import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "../../App.css";

import { registerUser } from "../../actions/accountActions";
import { connect } from "react-redux";

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

const RegistrationForm = ({ usersEmails, registerUser }) => {
  const classes = new useStyles();
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    PasswordConfirm: "",
    Address: "",
    Phone: ""
  });

  const handleSubmit = e => {
    e.preventDefault();

    registerUser(user);

    setUser({
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      PasswordConfirm: "",
      Address: "",
      Phone: ""
    });
  };
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const regexLettersOnly = /[^A-Za-z]+/;
    const regexNotANumber = /[^0-9]/;
    const regexAddress = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    //Email
    ValidatorForm.addValidationRule("isExistingUser", value => {
      let emailSearch = usersEmails.find(email => email === value);
      return emailSearch !== undefined && emailSearch === value ? false : true;
      return true;
    });

    //Password
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      console.log(user.Password, value);
      return value !== user.Password ? false : true;
    });
    ValidatorForm.addValidationRule("isLongerEqualThenSix", value => {
      return value.length < 6 ? false : true;
    });
    //First nad Last name
    ValidatorForm.addValidationRule("areLettersOnly", value => {
      return regexLettersOnly.test(value) ? false : true;
    });
    //Phone number
    ValidatorForm.addValidationRule("areNumbersOnly", value => {
      return regexNotANumber.test(value) ? false : true;
    });
    ValidatorForm.addValidationRule("isLongerEqualThenNine", value => {
      return value.length < 9 ? false : true;
    });
    //Address
    ValidatorForm.addValidationRule("isAddress", value => {
      return !regexAddress.test(value) ? false : true;
    });

    return function cleanup() {
      ValidatorForm.removeValidationRule("isPasswordMatch");
      ValidatorForm.removeValidationRule("isLongerEqualThenSix");
      ValidatorForm.removeValidationRule("areLettersOnly");
      ValidatorForm.removeValidationRule("areNumbersOnly");
      ValidatorForm.removeValidationRule("isLongerEqualThenNine");
      ValidatorForm.removeValidationRule("isAddress");
    };
  }, [user]);

  useEffect(() => {
    return function cleanup() {
      ValidatorForm.removeValidationRule("isPasswordMatch");
      ValidatorForm.removeValidationRule("isLongerEqualThenSix");
      ValidatorForm.removeValidationRule("areLettersOnly");
      ValidatorForm.removeValidationRule("areNumbersOnly");
      ValidatorForm.removeValidationRule("isLongerEqualThenNine");
      ValidatorForm.removeValidationRule("isAddress");
    };
  }, []);

  return (
    <div className="account-form-div">
      <div className="forms-in">
        <h1>Sign up</h1>
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={errors => console.log(errors)}
        >
          <div>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Email"
              onChange={handleChange}
              id="email-form"
              name="Email"
              value={user.Email}
              validators={["required", "isEmail", "isExistingUser"]}
              errorMessages={[
                "this field is required",
                "email is not valid",
                "user with this email already exists"
              ]}
            />
          </div>
          <div>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Password"
              type="password"
              onChange={handleChange}
              id="password-form"
              name="Password"
              value={user.Password}
              validators={["required", "isLongerEqualThenSix"]}
              errorMessages={[
                "this field is required",
                "password must be longer then 6 characters"
              ]}
            />
          </div>
          <div>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Repeat Password"
              type="password"
              name="PasswordConfirm"
              onChange={handleChange}
              id="password-form-confirm"
              value={user.PasswordConfirm}
              validators={["isPasswordMatch", "required"]}
              errorMessages={["password mismatch", "this field is required"]}
            />
          </div>
          <div>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="First Name"
              onChange={handleChange}
              id="firstname-form"
              name="FirstName"
              value={user.FirstName}
              validators={["required", "areLettersOnly"]}
              errorMessages={[
                "this field is required",
                "first name must consist of letters only"
              ]}
            />
          </div>
          <div>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Last Name"
              onChange={handleChange}
              id="lastname-form"
              name="LastName"
              value={user.LastName}
              validators={["required", "areLettersOnly"]}
              errorMessages={[
                "this field is required",
                "last name must consist of letters only"
              ]}
            />
          </div>
          <div>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Phone Number"
              onChange={handleChange}
              id="phonenumber-form"
              name="Phone"
              value={user.Phone}
              validators={[
                "required",
                "areNumbersOnly",
                "isLongerEqualThenNine"
              ]}
              errorMessages={[
                "this field is required",
                "phone number must consist of numbers only",
                "phone number must have more then 8 digits "
              ]}
            />
          </div>
          <div>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Address"
              onChange={handleChange}
              id="address-form"
              name="Address"
              value={user.Address}
              validators={["required", "isAddress"]}
              errorMessages={[
                "this field is required",
                "Adress must consist of numbers and letters"
              ]}
            />
          </div>
          <br />
          <div>
            <div>
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
    </div>
  );
};

const mapStateToProps = state => {
  const { AllUsers } = state.userReducer;
  console.log(AllUsers);
  return {
    usersEmails: AllUsers.map(user => user.Email)
  };
};

const mpaDispatchToProps = dispatch => {
  return {
    registerUser: user => {
      dispatch(registerUser(user));
    }
  };
};

export default connect(mapStateToProps, mpaDispatchToProps)(RegistrationForm);
