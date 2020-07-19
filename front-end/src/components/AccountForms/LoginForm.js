import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import googleSignIn from "../../actions/User/googleSignIn";
import signIn from "../../actions/User/signIn";
import GoogleLogin from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import config from "../../config.json";
import Spinner from "react-bootstrap/Spinner";

const styles = (theme) => ({
  signIn: {
    with: "100%",
    display: "flex",
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
    margin: "5px 5px 5px 5px",
  },
  signInHeader: {
    //textAlign: 'center'
  },
  signInFormField: {
    margin: "5px 5px 5px 5px",
    width: "300px",
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
  },
  logoImgDiv: {
    width: "100%",
    height: "30vh",
  },
  logoImg: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

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
    var user = {
      name: response.profileObj.name,
      password: response.profileObj.password,
      email: response.profileObj.email,
      tokenId: response.tokenId,
    };

    this.props.OnLogIn(user, this.props.history);
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
  handleGoogle() {
    console.log("GOOGLE CLICKED");
  }

  render() {
    const { classes } = this.props;
    return !this.props.loading ? (
      <div className={classes.signIn}>
        <div className={classes.signInForm}>
          <div className={classes.logoImgDiv}>
            <img className={classes.logoImg} src={require("../../logo.png")} />
          </div>
          <ValidatorForm onError={(errors) => console.log(errors)}>
            <TextValidator
              className={classes.signInFormField}
              label="Email"
              id="email-form"
              name="email"
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
              onChange={this.handleChange}
            />
            <br />
            <TextValidator
              className={classes.signInFormField}
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
                className={classes.loginButton}
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
        <div className={classes.socialsLogin}>
          <div className={classes.socialsLoginModal}>
            <GoogleLogin
              clientId={config.GOOGLE_CLIENT_ID}
              buttonText="via Google"
              className={classes.socialButton}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    ) : (
      <Spinner animation="border" />
    );
  }
  y;
}
const mapStateToProps = (state) => ({
  loading: state.loadingReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  OnLogIn: (user, history) => dispatch(signIn(user, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginForm));
