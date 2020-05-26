import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from '@material-ui/core/styles'

import signUp from "../../actions/User/signUp";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";



const styles = (theme) => ({
  register: {
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
    margin: '5px 5px 5px 5px',
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



class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    FirstName: "",
    LastName: "",
    Email: "",
    Key: "",
    KeyConfirm: "",
    Address: "",
    Phone: "",
    PassportId: "",
    Salt: "salt",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.OnSignUp(this.state, this.props.history);

    /* this.setState({
      FirstName: "",
      LastName: "",
      Email: "",
      Key: "",
      KeyConfirm: "",
      Address: "",
      Phone: "",
      Salt: "",
    });*/
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    const regexLettersOnly = /[^A-Za-z]+/;
    const regexNotANumber = /[^0-9]/;
    const usersEmails = this.props.AllUsers.map((user) => user.Email);
    //const regexAddress = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    //Email
    ValidatorForm.addValidationRule("isExistingUser", (value) => {
      let emailSearch = usersEmails.find((email) => email === value);
      return emailSearch !== undefined && emailSearch === value ? false : true;
    });

    //Password
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      return value !== this.state.Key ? false : true;
    });

    //First nad Last name
    ValidatorForm.addValidationRule("areLettersOnly", (value) => {
      return regexLettersOnly.test(value) ? false : true;
    });
    //Phone number
    ValidatorForm.addValidationRule("areNumbersOnly", (value) => {
      return regexNotANumber.test(value) ? false : true;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isPasswordMatch");
    ValidatorForm.removeValidationRule("areLettersOnly");
    ValidatorForm.removeValidationRule("areNumbersOnly");
  }

  render() {
    const { classes } = this.props

    return this.props.loading ? (
      <CircularProgress />
    ) : (
        <div className={classes.register}>
          
          <div className={classes.registerForm}>
          <div className={classes.logoImgDiv}>
            <img className={classes.logoImg} src={require('./add-account.png')} />
          </div>
            <ValidatorForm
              onSubmit={this.handleSubmit}
              onError={(errors) => console.log(errors)}
            >
              <br />
              <TextValidator
                className={classes.registerFormField}
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
                  "user with this email already exists",
                ]}
              />
              <br />
              <TextValidator
                className={classes.registerFormField}
                margin="normal"
                label="Password"
                type="password"
                onChange={this.handleChange}
                id="password-form"
                name="Key"
                value={this.state.Key}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <br />
              <TextValidator
                className={classes.registerFormField}
                margin="normal"
                label="Repeat Password"
                type="password"
                name="KeyConfirm"
                onChange={this.handleChange}
                id="password-form-confirm"
                value={this.state.KeyConfirm}
                validators={["isPasswordMatch", "required"]}
                errorMessages={["password mismatch", "this field is required"]}
              />
              <br />
              <TextValidator
                className={classes.registerFormField}
                margin="normal"
                label="First Name"
                onChange={this.handleChange}
                id="firstname-form"
                name="FirstName"
                value={this.state.FirstName}
                validators={["required", "areLettersOnly"]}
                errorMessages={[
                  "This field is required",
                  "First name must consist of letters only",
                ]}
              />
              <br />
              <TextValidator
                className={classes.registerFormField}
                margin="normal"
                label="Last Name"
                onChange={this.handleChange}
                id="lastname-form"
                name="LastName"
                value={this.state.LastName}
                validators={["required", "areLettersOnly"]}
                errorMessages={[
                  "This field is required",
                  "Last name must consist of letters only",
                ]}
              />
              <br />
              <TextValidator
                className={classes.registerFormField}
                margin="normal"
                label="Phone Number"
                onChange={this.handleChange}
                id="phonenumber-form"
                name="Phone"
                value={this.state.Phone}
                validators={["required", "areNumbersOnly"]}
                errorMessages={["this field is required"]}
              />
              <br />
              <TextValidator
                className={classes.registerFormField}
                margin="normal"
                label="Address"
                onChange={this.handleChange}
                id="address-form"
                name="Address"
                value={this.state.Address}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <br />
              <TextValidator
                className={classes.registerFormField}
                margin="normal"
                label="Passport Id"
                onChange={this.handleChange}
                id="passportId-form"
                name="PassportId"
                value={this.state.PassportId}
                validators={["required", "areNumbersOnly"]}
                errorMessages={["this field is required"]}
              />
              <br />
              <Button className={classes.registerButton} type="submit" variant="contained" color="primary">
                Register
                </Button>


            </ValidatorForm>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  AllUsers: state.userReducer.AllUsers,
  loading: state.loadingReducer.loading,
});

const mpaDispatchToProps = (dispatch) => ({
  OnSignUp: (user) => dispatch(signUp(user)),
});

export default connect(mapStateToProps, mpaDispatchToProps)(withStyles(styles)(RegistrationForm));
