import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { registerUser } from "../../actions/accountActions";
import { connect } from "react-redux";

class RegistrationForm extends Component {
  state = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    PasswordConfirm: "",
    Address: "",
    Phone: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.registerUser(this.state);

    this.setState({
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      PasswordConfirm: "",
      Address: "",
      Phone: ""
    });
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const regexLettersOnly = /[^A-Za-z]+/;
    const regexNotANumber = /[^0-9]/;
    const regexAddress = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    //Email
    ValidatorForm.addValidationRule("isExistingUser", value => {
      let emailSearch = this.props.usersEmails.find(email => email === value);
      return emailSearch !== undefined && emailSearch === value ? false : true;
    });

    //Password
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      return value !== this.state.Password ? false : true;
    });
    // ValidatorForm.addValidationRule("isLongerEqualThenSix", value => {
    //   return (value.length < 6) ? false : true;
    // })
    //First nad Last name
    ValidatorForm.addValidationRule("areLettersOnly", value => {
      return regexLettersOnly.test(value) ? false : true;
    });
    //Phone number
    ValidatorForm.addValidationRule("areNumbersOnly", value => {
      return regexNotANumber.test(value) ? false : true;
    });
    // ValidatorForm.addValidationRule("isLongerEqualThenNine", value => {
    //   return (value.length < 9) ? false : true;
    // })
    //Address
    // ValidatorForm.addValidationRule("isAddress", value => {
    //   return (!regexAddress.test(value)) ? false : true;
    // })
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isPasswordMatch");
    //ValidatorForm.removeValidationRule('isLongerEqualThenSix');
    ValidatorForm.removeValidationRule("areLettersOnly");
    ValidatorForm.removeValidationRule("areNumbersOnly");
    // ValidatorForm.removeValidationRule('isLongerEqualThenNine');
    //ValidatorForm.removeValidationRule('isAddress');
  }

  render() {
    return (
      <div className="account-form-div">
        <div className="forms-in">
          <div className="form-text-field">
            <h1>Sign up</h1>
          </div>
          <ValidatorForm
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <div className="form-text-field">
              <TextValidator
                margin="normal"
                label="Email"
                onChange={this.handleChange}
                id="email-form"
                name="Email"
                value={this.state.Email}
                validators={["required", "isEmail", "isExistingUser"]}
                errorMessages={[
                  "this field is required",
                  "email is not valid",
                  "user with this email already exists"
                ]}
              />
            </div>
            <div className="form-text-field">
              <TextValidator
                margin="normal"
                label="Password"
                type="password"
                onChange={this.handleChange}
                id="password-form"
                name="Password"
                value={this.state.Password}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </div>
            <div className="form-text-field">
              <TextValidator
                margin="normal"
                label="Repeat Password"
                type="password"
                name="PasswordConfirm"
                onChange={this.handleChange}
                id="password-form-confirm"
                value={this.state.PasswordConfirm}
                validators={["isPasswordMatch", "required"]}
                errorMessages={["password mismatch", "this field is required"]}
              />
            </div>
            <div className="form-text-field">
              <TextValidator
                margin="normal"
                label="First Name"
                onChange={this.handleChange}
                id="firstname-form"
                name="FirstName"
                value={this.state.FirstName}
                validators={["required", "areLettersOnly"]}
                errorMessages={[
                  "This field is required",
                  "First name must consist of letters only"
                ]}
              />
            </div>
            <div className="form-text-field">
              <TextValidator
                margin="normal"
                label="Last Name"
                onChange={this.handleChange}
                id="lastname-form"
                name="LastName"
                value={this.state.LastName}
                validators={["required", "areLettersOnly"]}
                errorMessages={[
                  "This field is required",
                  "Last name must consist of letters only"
                ]}
              />
            </div>
            <div className="form-text-field">
              <TextValidator
                margin="normal"
                label="Phone Number"
                onChange={this.handleChange}
                id="phonenumber-form"
                name="Phone"
                value={this.state.Phone}
                validators={["required", "areNumbersOnly"]}
                errorMessages={["this field is required"]}
              />
            </div>
            <div className="form-text-field">
              <TextValidator
                margin="normal"
                label="Address"
                onChange={this.handleChange}
                id="address-form"
                name="Address"
                value={this.state.Address}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </div>
            <br />
            <div className="form-text-field">
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Register
                </Button>
              </div>
            </div>
            <br />
          </ValidatorForm>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { AllUsers } = state.userReducer;
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

