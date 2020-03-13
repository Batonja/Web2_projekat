import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailError: false
    };
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ emailError: false });

    const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!regexEmail.test(this.emailRef.current.value)) {
      this.setState({ emailError: true });
      //Trigger error message for email
    }
  }
  render() {
    return (
      <div className="signInForm">
        <h1 className="titleSignIn">Sign in</h1>
        <ValidatorForm onError={errors => console.log(errors)}>
          <TextValidator
            margin="normal"
            label="Email"
            id="email-form"
            name="email"
            ref={this.emailRef}
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />
          {this.state.emailError === true ? (
            <p style={{ color: "red" }}>
              Email error please provide valid email
            </p>
          ) : (
            ""
          )}
          <br />

          <TextValidator
            margin="normal"
            label="Password"
            type="password"
            id="password-form"
            name="password"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          <br />
          <div className="signInBtn">
            <Button
              variant="contained"
              id="searchButton"
              onClick={this.handleSubmit}
              color="primary"
            >
              Log In
            </Button>
          </div>
        </ValidatorForm>
      </div>
    );
  }
}

export default LoginForm;
