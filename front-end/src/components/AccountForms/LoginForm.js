import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import googleSignIn from "../../actions/User/googleSignIn";
import GoogleLogin from "react-google-login";
import { FacebookProvider, LoginButton } from "react-facebook";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      email: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  responseGoogle = (response) => {
    alert(response.profileObj.name);

    var user = {
      name: response.profileObj.name,
      password: response.profileObj.password,
      email: response.profileObj.email,
    };

    this.props.OnLogIn();
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit() {
    this.props.OnLogIn(
      this.state.email,
      this.state.password,
      this.props.history
    );
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
          <GoogleLogin
            clientId="84415640380-49oeo2vcou5rg5fdd2o4qgbsncu40v8e.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />

          <FacebookProvider appId="585388678821501">
            <LoginButton
              scope="email"
              onCompleted={this.handleResponse}
              onError={this.handleError}
            >
              <span>Login via Facebook</span>
            </LoginButton>
          </FacebookProvider>
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
  OnLogIn: (user, history) => dispatch(googleSignIn(email, history)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
