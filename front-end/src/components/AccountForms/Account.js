import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
//import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";




import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  AcountFlexContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: "center",
  },
  AccountFormFlexBoxContainer: {
    width: "15%",
    height: "100%",
    display: "flex",
    margin: '10px',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
  },
  tabelesFlexBoxContainer: {
    width: "36%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "left",
  },

  accountHeaders: {
    textAlign: "center",
    fontWeight: "bold",
    margin: '10px'

  },
  tabele: {
    alignItems: 'baseline'
  }

})

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3F51B5',
    color: 'white',
    width: '10%',
    textAlign: 'left'
  },
  body: {
    textAlign: 'left',
    color: 'black',
    fontSize: 13,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.paper,
      width: "95%"
    },
  },
}))(TableRow);

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
      AllFriends: [
        {
          FirstName: "Zivojin",
          LastName: "Misic",
          Email: "zivkozivkic@yahoo.com",
        },
        {
          Email: "mileta@bode.com",
          FirstName: "Milojica",
          LastName: "Milovanov",
        },
      ],
    };

    console.log(this.props.loggedInUser)
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

  dateConversion = (date) => {
    return date.toLocaleDateString('en-US');
  }

  render() {
    const { classes } = this.props;
    const { loggedInUser } = this.props;
    return (
      <div className={classes.AcountFlexContainer}>
        <div className={classes.AccountFormFlexBoxContainer}>
          <div >
            <h3 className={classes.accountHeaders}>Account Details</h3>
          </div>
          <ValidatorForm onError={(errors) => console.log(errors)}>
            <div>

            </div>
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
            <div>

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
            </div>
            <div>
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
            </div>
            <div>
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
            <div>
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
            </div>
            <div>
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
            <div>
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
            <div>
              <Button variant="contained" color="primary">
                Edit
            </Button>
            </div>

          </ValidatorForm>
        </div>
        <div className={classes.tabelesFlexBoxContainer}>
          <div >
            <h3 className={classes.accountHeaders}>My Friends</h3>
          </div>
          <TableContainer component={Paper} style={{ width: '90%' }}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell align="right">First Name</StyledTableCell>
                  <StyledTableCell align="right">Last Name</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.AllFriends.map(friend => (
                    <StyledTableRow key={friend.Email}>
                      <StyledTableCell component="th" scope="row">
                        {friend.Email}
                      </StyledTableCell>
                      <StyledTableCell align="right">{friend.FirstName}</StyledTableCell>
                      <StyledTableCell align="right">{friend.LastName}</StyledTableCell>
                    </StyledTableRow>

                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>

        </div>
        <div className={classes.tabelesFlexBoxContainer} style={{ width: '45%' }}>
          <div >
            <h3 className={classes.accountHeaders}>My Flights</h3>
          </div>
          <TableContainer component={Paper} style={{ width: '100%' }}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell align="right">First Name</StyledTableCell>
                  <StyledTableCell align="right">Last Name</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.AllFriends.map(friend => (
                    <StyledTableRow key={friend.Email}>
                      <StyledTableCell component="th" scope="row">
                        {friend.Email}
                      </StyledTableCell>
                      <StyledTableCell align="right">{friend.FirstName}</StyledTableCell>
                      <StyledTableCell align="right">{friend.LastName}</StyledTableCell>
                    </StyledTableRow>

                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <div >
            <h3 className={classes.accountHeaders}>My Rented Cars</h3>
          </div>
          <TableContainer component={Paper} style={{ width: '100%' }}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Service</StyledTableCell>
                  <StyledTableCell align="left">Car Model</StyledTableCell>
                  <StyledTableCell align="left">Pick up date&nbsp;</StyledTableCell>
                  <StyledTableCell align="left">Drop off date&nbsp;</StyledTableCell>
                  <StyledTableCell align="left">Total Price&nbsp;($)</StyledTableCell>
                  <StyledTableCell align="left">Service Grade</StyledTableCell>
                  <StyledTableCell align="left">Car Grade</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  loggedInUser.CarOrders.map((order, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {order.orderDetails.service}
                      </StyledTableCell>
                      <StyledTableCell align="left">{order.vehicle.CarModel}</StyledTableCell>
                      <StyledTableCell align="left">
                        {this.dateConversion(order.orderDetails.datesForLease.startDate)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {this.dateConversion(order.orderDetails.datesForLease.endDate)}
                      </StyledTableCell>
                      <StyledTableCell align="left" > {order.totalPrice}</StyledTableCell>
                      <StyledTableCell align="left">
                        <Rating value={order.vehicle.AverageCarGrade} readOnly />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Rating value={order.vehicle.AverageCarGrade} readOnly />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <h5 className={classes.accountHeaders}>You can grade your ordered and car and service after drop off</h5>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.userReducer.AllUsers,
  loggedInUser: state.userReducer.LoggedInUser,
});

export default connect(mapStateToProps)(withStyles(styles)(Account));
