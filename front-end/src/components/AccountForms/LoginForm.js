import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import signIn from "../../actions/User/signIn";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      email: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit() {
    this.props.OnLogIn(this.state.email, this.state.password);
    this.props.history.push("/");
  }
  render() {
    return (
      <div className="signInForm">
        <h1 className="titleSignIn">Sign in</h1>
        <ValidatorForm onError={(errors) => console.log(errors)}>
          <TextValidator
            margin="normal"
            label="Email"
            id="email-form"
            name="email"
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
const mapDispatchToProps = (dispatch) => ({
  OnLogIn: (email, password) => dispatch(signIn(email, password)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
