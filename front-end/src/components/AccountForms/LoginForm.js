import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      email: ''
    };


    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };


  handleSubmit() {
    
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
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />
        
          <br />

          <TextValidator
            margin="normal"
            label="Password"
            type="password"
            id="password-form"
            name="password"
            validators={["required"]}
            errorMessages={["Password field is required"]}
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
