import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
//import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import getFlightOrders from "../../actions/Flight/getFlightOrders";
import FlightBasicInformation from "../Flight/Preview/FlightBasicInformation";
import Spinner from "react-bootstrap/Spinner";
import deleteOrder from "../../actions/Flight/deleteOrder";
import confirmOrder from "../../actions/Flight/confirmOrder";
import getUsers from "../../actions/User/getUsers";
import addFriend from "../../actions/User/addFriend";
import getFriends from "../../actions/User/getFriends";
import confirmFriendship from "../../actions/User/confirmFriendship";

const styles = (theme) => ({
  AcountFlexContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  AccountFormFlexBoxContainer: {
    width: "15%",
    height: "100%",
    display: "flex",
    margin: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tabelesFlexBoxContainer: {
    width: "25%",
    height: "100%",
    display: "flex",
    margin: "5px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
  },
  addFriendFormOverlay: {
    position: "fixed",
    flexDirection: "column",
    display: "none",
    [theme.breakpoints.down("xs", "sm", "md")]: {
      width: "95%",
      height: "100%",
      top: "10.0%",
    },
    width: "30%",
    height: "50%",
    top: "20.0%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    opacity: "0.9",
    border: "",
    borderRadius: "20%",
    backgroundColor: "black",
    zIndex: "2",
    cursor: "pointer",
  },
  accountHeaders: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "10px",
    color: "#ff4d07",
  },
  tabele: {
    alignItems: "baseline",
  },
  textFieldAddFriend: {
    zIndex: "2",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3F51B5",
    color: "white",
    width: "10%",
    textAlign: "left",
  },
  body: {
    textAlign: "left",
    color: "black",
    fontSize: 13,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.paper,
      width: "95%",
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
      AllFriends: this.props.loggedInUser.Friends,
      FriendsEmail: "",
      airlineGrade: 0,
      flightGrade: 0,
      service: 0,
      car: 0,
      unconfirmedFlightOrders: undefined,
      friend: "",

      myFlightOrders: undefined,
    };
    this.deleteFlightOrder = this.deleteFlightOrder.bind(this);
    this.addFriendOverlayRef = React.createRef(null);

    console.log(this.props.loggedInUser);
  }

  filterUsers(user) {
    const { ROLES } = this.props;
    const { loggedInUser } = this.props;

    if (
      user.Role == ROLES.USER &&
      user.Email != loggedInUser.Email
      //!loggedInUser.Friends.includes(user.Email)
    )
      return true;
    else return false;
  }

  handleConfirmFriendship(friend) {
    friend.confirmed = true;

    this.props.confirmFriendship(friend);
  }

  deleteFlightOrder(order) {
    this.props.deleteFlightOrder(order);
  }

  confirmFlightOrder(order) {
    this.props.confirmFlightOrder(order);
  }

  componentDidMount() {
    const regexLettersOnly = /[^A-Za-z]+/;
    const regexNotANumber = /[^0-9]/;
    this.props.getFlightOrders();
    const filteredUsers = this.props.allUsers.filter(
      this.filterUsers.bind(this)
    );
    this.props.getUsers();
    this.props.getFriends();
    //const allEmails = [];

    const usersEmails = this.props.allUsers.map((user) => user.Email);

    //isExistingUser
    ValidatorForm.addValidationRule("isExistingUser", (value) => {
      let emailSearch = filteredUsers.find((email) => email === value);
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

  parseDateToString = (date) => {
    return date.toLocaleDateString("en-US");
  };
  parseStringToDate(string) {
    var splitedString = string.split("/");
    var date = new Date(
      splitedString[2] + "-" + splitedString[1] + "-" + splitedString[0]
    );
    return date;
  }
  handleAddFormToggle() {
    //console.log("CLICKED: ", this)
    const node = this.addFriendOverlayRef.current;
    node.style.display = "flex";
  }

  handleClickAddFriend = (e) => {
    e.preventDefault();
    const node = this.addFriendOverlayRef.current;
    node.style.display = "none";

    var friend = {
      FriendOf: this.state.friend,
      FriendWith: this.props.loggedInUser,
      Confirmed: false,
    };
    this.props.addFriend(friend);
    /*
    console.log("ADDING EMAIL: ", this.state.FriendsEmail);

    const { FriendsEmail } = this.state;
    this.props.addFriend(FriendsEmail, this.props.loggedInUser.Email);
    this.props.history.push("/account");
    this.setState({
      ...this.state,
      FriendsEmail: "",
    });
    */
  };

  render() {
    const today = new Date();
    const { classes } = this.props;
    const { loggedInUser } = this.props;
    const { AllUsers } = this.props;
    return this.props.loading ? (
      <Spinner animation="border" />
    ) : (
      <div className={classes.AcountFlexContainer}>
        <div className={classes.AccountFormFlexBoxContainer}>
          <div>
            <h3 className={classes.accountHeaders}>Account Details</h3>
          </div>
          <ValidatorForm onError={(errors) => console.log(errors)}>
            <div>
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
            </div>
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
          <div>
            <h3 className={classes.accountHeaders}>My Friends</h3>
          </div>
          {/* FriendsOf - lista svih prijatelja i u njoj friendsOf.friendWith - konkretan user sa kojim nas ulogovani ima prijateljstvo */}
          {this.props.loggedInUser.friendsOf ? (
            <TableContainer component={Paper} style={{ width: "100%" }}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Email</StyledTableCell>
                    {/* <StyledTableCell align="right">First Name</StyledTableCell>
                <StyledTableCell align="right">Last Name</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.allFriends === undefined
                    ? ""
                    : this.props.allFriends.map((friend) => {
                        return (friend.friendOf.userId ===
                          this.props.loggedInUser.userId ||
                          friend.friendWith.userId ===
                            this.props.loggedInUser.userId) &&
                          friend.confirmed === true ? (
                          <StyledTableRow key={friend.friendshipId}>
                            <StyledTableCell component="th" scope="row">
                              {friend.friendWith.userId ===
                              this.props.loggedInUser
                                ? friend.friendWith.email
                                : friend.friendOf.email}
                            </StyledTableCell>
                            {/* <StyledTableCell align="right">{tempFriend.FirstName}</StyledTableCell>
                  <StyledTableCell align="right">{tempFriend.LastName}</StyledTableCell> */}
                          </StyledTableRow>
                        ) : (
                          ""
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            ""
          )}
          {
            <Button
              variant="contained"
              onClick={this.handleAddFormToggle.bind(this)}
              color="primary"
              size="large"
              style={{ margin: "10px" }}
              //endIcon={<SendRoundedIcon />}
            >
              Add Friend
            </Button>
          }{" "}
        </div>

        <div className={classes.tabelesFlexBoxContainer}>
          <div>
            <h3 className={classes.accountHeaders}>Friend Requests</h3>
          </div>
          {this.props.loggedInUser.friendsOf ? (
            <TableContainer component={Paper} style={{ width: "100%" }}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Email</StyledTableCell>
                    {/* <StyledTableCell align="right">First Name</StyledTableCell>
                <StyledTableCell align="right">Last Name</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Ovde se setam kroz friendsOf jer su u friendsOf oni koji su mom korisniku poslali zahtev */}
                  {this.props.allFriends === undefined
                    ? ""
                    : this.props.allFriends.map((friend) => {
                        return friend.friendOf.userId ===
                          this.props.loggedInUser.userId &&
                          friend.confirmed !== true ? (
                          <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                              {friend.friendWith.email}
                              <Button
                                key={friend.friendshipId}
                                variant="contained"
                                onClick={() =>
                                  this.handleConfirmFriendship(friend)
                                }
                                size="small"
                                style={{ margin: "10px" }}
                                //endIcon={<SendRoundedIcon />}
                              >
                                Confirm
                              </Button>
                            </StyledTableCell>

                            {/* <StyledTableCell align="right">{tempFriend.FirstName}</StyledTableCell>
                  <StyledTableCell align="right">{tempFriend.LastName}</StyledTableCell> */}
                          </StyledTableRow>
                        ) : (
                          ""
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            ""
          )}
        </div>

        <div
          className={classes.tabelesFlexBoxContainer}
          style={{ width: "60%" }}
        >
          <div>
            <h3 className={classes.accountHeaders}>My Flights</h3>
          </div>

          {this.props.loggedInUser.FlightOrders ? (
            <TableContainer component={Paper} style={{ width: "100%" }}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Airline</StyledTableCell>
                    <StyledTableCell>Destination</StyledTableCell>
                    <StyledTableCell align="right">
                      Departure date
                    </StyledTableCell>
                    <StyledTableCell align="right">Arival date</StyledTableCell>
                    <StyledTableCell align="right">
                      Price&nbsp;($)
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Airline Grade
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Flight Grade
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loggedInUser.FlightOrders.map((flight, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{flight.AirlineTitle}</StyledTableCell>
                      <StyledTableCell>{flight.Destination}</StyledTableCell>
                      <StyledTableCell align="right">
                        {flight.DepartureDate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {flight.ArrivalDate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {flight.Price}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {flight.ArrivalDate > today ? (
                          <Rating name="disabled" value={0} disabled />
                        ) : (
                          <Rating
                            name="simple-controlled"
                            value={this.state.airlineGrade}
                            onChange={(event, newValue) => {
                              this.setState({
                                ...this.state,
                                airlineGrade: newValue,
                              });
                            }}
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {flight.ArrivalDate > today ? (
                          <Rating name="disabled" value={0} disabled />
                        ) : (
                          <Rating
                            value={this.state.flightGrade}
                            onChange={(event, newValue) => {
                              this.setState({
                                ...this.state,
                                flightGrade: newValue,
                              });
                            }}
                          />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            ""
          )}
          {this.props.confirmedFlightOrders !== undefined ? (
            <Container fluid>
              {Array.from(this.props.confirmedFlightOrders).map((order) => {
                return order.user.userId === this.props.loggedInUser.userId ? (
                  <Row>
                    <FlightBasicInformation
                      airline={order.flight.airline}
                      flight={order.flight}
                    />
                    <Col md="auto" className="flightItem">
                      <TextField
                        label="Luggage"
                        value={
                          order.flightLuggage.flightLuggageType === 0
                            ? "Hand"
                            : "Checked"
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    </Col>
                    <Col md="auto" className="flightItem">
                      <TextField
                        label="Flight Ticket Type / Price"
                        value={
                          (order.flightTicket.type === 0
                            ? "Business"
                            : "Economy") +
                          " / " +
                          order.flightTicket.price
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    </Col>
                    <Col md="auto" className="flightItem">
                      <TextField
                        label="Seat Number"
                        value={order.seat.seatNumber}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    </Col>
                    <Button
                      key={order.flightOrderId}
                      onClick={() => this.deleteFlightOrder(order)}
                      variant="outlined"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </Row>
                ) : (
                  ""
                );
              })}
            </Container>
          ) : (
            ""
          )}

          {this.props.unconfirmedFlightOrders === undefined ? (
            ""
          ) : (
            <>
              <h4 className={classes.accountHeaders}>Unconfirmed Flights</h4>
              <Container fluid>
                {Array.from(this.props.unconfirmedFlightOrders).map((order) => {
                  return order.user.userId ===
                    this.props.loggedInUser.userId ? (
                    <Row>
                      <FlightBasicInformation
                        airline={order.flight.airline}
                        flight={order.flight}
                      />
                      <Col md="auto" className="flightItem">
                        <TextField
                          label="Luggage"
                          value={
                            order.flightLuggage.flightLuggageType === 0
                              ? "Hand"
                              : "Checked"
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      </Col>
                      <Col md="auto" className="flightItem">
                        <TextField
                          label="Flight Ticket Type / Price"
                          value={
                            (order.flightTicket.type === 0
                              ? "Business"
                              : "Economy") +
                            " / " +
                            order.flightTicket.price
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      </Col>
                      <Col md="auto" className="flightItem">
                        <TextField
                          label="Seat Number"
                          value={order.seat.seatNumber}
                          InputProps={{
                            readOnly: true,
                          }}
                        ></TextField>
                      </Col>
                      <Col md="auto" className="flightItem">
                        <Button
                          key={order.flightOrderId}
                          onClick={() => this.deleteFlightOrder(order)}
                          variant="outlined"
                          color="secondary"
                        >
                          Cancel
                        </Button>
                        <Button
                          key={order.flightOrderId}
                          onClick={() => this.confirmFlightOrder(order)}
                          variant="outlined"
                          color="secondary"
                        >
                          Confirm
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  );
                })}
              </Container>
            </>
          )}

          <hr
            style={{
              border: "2px solid black",
              width: "90%",
              borderRadius: "5px",
            }}
          />
          <div>
            <h3 className={classes.accountHeaders}>My Rented Cars</h3>
          </div>

          {this.props.loggedInUser.CarOrders ? (
            <TableContainer component={Paper} style={{ width: "100%" }}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Service</StyledTableCell>
                    <StyledTableCell align="left">Car Model</StyledTableCell>
                    <StyledTableCell align="left">
                      Pick up date&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Drop off date&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Total Price&nbsp;($)
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Service Grade
                    </StyledTableCell>
                    <StyledTableCell align="left">Car Grade</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loggedInUser.CarOrders.map((order, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {order.orderDetails.service}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {order.vehicle.CarModel}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {this.parseDateToString(
                          order.orderDetails.datesForLease.startDate
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {this.parseDateToString(
                          order.orderDetails.datesForLease.endDate
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {" "}
                        {order.totalPrice}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {order.orderDetails.datesForLease.endDate > today ? (
                          <Rating
                            name="disabled"
                            value={this.state.service}
                            disabled
                          />
                        ) : (
                          <Rating
                            value={this.state.service}
                            onChange={(event, newValue) => {
                              this.setState({
                                ...this.state,
                                service: newValue,
                              });
                            }}
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {order.orderDetails.datesForLease.endDate > today ? (
                          <Rating
                            name="disabled"
                            value={this.state.car}
                            disabled
                          />
                        ) : (
                          <Rating
                            value={this.state.car}
                            onChange={(event, newValue) => {
                              this.setState({
                                ...this.state,
                                car: newValue,
                              });
                            }}
                          />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            ""
          )}

          <div>
            <h5 className={classes.accountHeaders}>
              You can grade your ordered and car and service after drop off
            </h5>
          </div>
        </div>

        <div
          ref={this.addFriendOverlayRef}
          className={classes.addFriendFormOverlay}
        >
          {/* // onClick={this.off}> */}
          <div>
            <h3 className={classes.accountHeaders}>
              Pick a person you want to add as a friend
            </h3>
            <ValidatorForm onError={(errors) => console.log(errors)}>
              <div
                style={{
                  border: "1px solid white",
                  borderRadius: "20px",
                  alignItems: "center",
                  backgroundColor: "#3F51B5",
                }}
              >
                <Select
                  margin="normal"
                  label="Friend"
                  id="firstName-form"
                  name="friend"
                  className={classes.textFieldAddFriend}
                  onChange={this.handleChange}
                  value={this.state.friend}
                >
                  {Array.from(this.props.allUsers).map((user) => {
                    return user.userId !== loggedInUser.userId &&
                      user.friendsOf !== undefined &&
                      (user.friendsOf.some(
                        (friend) => friend.userId !== user.userId
                      ) ||
                        user.friendsOf.length === 0) ? (
                      <MenuItem value={user}>{user.email}</MenuItem>
                    ) : (
                      ""
                    );
                  })}
                </Select>
              </div>
            </ValidatorForm>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: "20px" }}
              onClick={this.handleClickAddFriend}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addFriend: (FriendsEmail, userEmail) =>
    dispatch(addFriend(FriendsEmail, userEmail)),
  getFlightOrders: () => dispatch(getFlightOrders()),
  deleteFlightOrder: (flightOrder) => dispatch(deleteOrder(flightOrder)),
  confirmFlightOrder: (flightOrder) => dispatch(confirmOrder(flightOrder)),
  getUsers: () => dispatch(getUsers()),
  addFriend: (friend) => dispatch(addFriend(friend)),
  getFriends: () => dispatch(getFriends()),
  confirmFriendship: (friend) => dispatch(confirmFriendship(friend)),
});

const mapStateToProps = (state) => ({
  allUsers: state.userReducer.AllUsers,
  loggedInUser: state.userReducer.LoggedInUser,
  ROLES: state.userReducer.ROLES,
  confirmedFlightOrders: state.flightReducer.confirmedFlightOrders,
  unconfirmedFlightOrders: state.flightReducer.unconfirmedFlightOrders,
  loading: state.loadingReducer.loading,
  allFriends: state.userReducer.AllFriends,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Account));
