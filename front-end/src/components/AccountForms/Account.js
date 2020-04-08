import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
//import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import Button from "@material-ui/core/Button";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllUsers: this.props.allUsers,
      FirstName: this.props.loggedInUser.FirstName,
      LastName: this.props.loggedInUser.LastName,
      Email: this.props.loggedInUser.Email,
      Password: this.props.loggedInUser.Password,
      PasswordConfirm: this.props.loggedInUser.Password,
      Address: this.props.loggedInUser.Address,
      Phone: this.props.loggedInUser.Phone,
      AllEmails: [],
      AllFriends: [],
    };
  }

  componentDidMount() {
    const regexLettersOnly = /[^A-Za-z]+/;
    const regexNotANumber = /[^0-9]/;
    //const regexAddress = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

    const allEmails = [];
    const allFriends = [];
    for (var index = 0; index < this.state.AllUsers.length; index++) {
      if (this.state.AllUsers[index].Email !== this.state.Email) {
        allEmails.push(this.state.AllUsers[index].Email);
      }
      for (
        var indexOfFriend = 0;
        indexOfFriend < this.props.loggedInUser.Friends.length;
        indexOfFriend++
      ) {
        if (
          this.props.loggedInUser.Friends[indexOfFriend] ===
          this.state.AllUsers[index].Email
        ) {
          allFriends.push(this.state.AllUsers[index]);
        }
      }
    }

    this.setState({ AllEmails: allEmails, AllFriends: allFriends });
    //Email
    ValidatorForm.addValidationRule("isExistingUser", (value) => {
      let emailSearch = this.state.AllEmails.find((email) => email === value);
      return emailSearch !== undefined && emailSearch === value ? false : true;
    });

    //Password
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      return value !== this.state.Password ? false : true;
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
    //ValidatorForm.removeValidationRule('isLongerEqualThenSix');
    ValidatorForm.removeValidationRule("areLettersOnly");
    ValidatorForm.removeValidationRule("areNumbersOnly");
    // ValidatorForm.removeValidationRule('isLongerEqualThenNine');
    //ValidatorForm.removeValidationRule('isAddress');
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Container fluid>
        <ValidatorForm onError={(errors) => console.log(errors)}>
          <Row>
            <Col md="auto">
              <TextValidator
                margin="normal"
                label="First Name"
                id="firstName-form"
                name="FirstName"
                onChange={this.handleChange}
                validators={["required", "areLettersOnly"]}
                value={this.state.FirstName}
                errorMessages={[
                  "This field is required",
                  "First name must consist of letters only",
                ]}
              />
            </Col>
            <Col md="auto">
              <TextValidator
                margin="normal"
                label="Last Name"
                id="lastName-form"
                name="LastName"
                onChange={this.handleChange}
                validators={["required", "areLettersOnly"]}
                value={this.state.LastName}
                errorMessages={[
                  "This field is required",
                  "Last name must consist of letters only",
                ]}
              />
            </Col>
            <Col md="auto">
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
                  "user with this email already exists",
                ]}
              />
            </Col>
            <Col md="auto">
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
            </Col>
            <Col md="auto">
              <TextValidator
                margin="normal"
                label="Repeat Password"
                type="password"
                name="PasswordConfirm"
                onChange={this.handleChange}
                defaultValue={this.state.Password}
                value={this.state.PasswordConfirm}
                id="password-form-confirm"
                validators={["isPasswordMatch", "required"]}
                errorMessages={["password mismatch", "this field is required"]}
              />
            </Col>
            <Col md="auto">
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
            </Col>
            <Col md="auto">
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
            </Col>
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </Row>
          <Row>
            <Container>
              <Row>
                <Col lg="auto">
                  <div className="tableFriendsTitle"> My Friends </div>
                </Col>
              </Row>
              {Array.from(this.state.AllFriends).map((friend, index) => {
                return (
                  <Row>
                    <Col md="auto"></Col>
                  </Row>
                );
              })}
            </Container>
          </Row>
        </ValidatorForm>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.userReducer.AllUsers,
  loggedInUser: state.userReducer.LoggedInUser,
});

export default connect(mapStateToProps)(Account);
