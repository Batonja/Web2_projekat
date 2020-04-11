import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import search from "../../actions/Flight/search";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destinations: [],
      departureDate: "",
      arrivalDate: "",
      destination: "",
      ticketPrice: 0,
    };
  }

  componentDidMount() {
    this.getDestinations();
    this.setState({
      arrivalDate: this.getTodaysDate(),
      departureDate: this.getTodaysDate(),
    });
  }

  getDestinations() {
    var sortedDestinations = [];

    for (let num = 0; num < this.props.airlines.length; num++) {
      for (
        let numOfFlight = 0;
        numOfFlight < this.props.airlines[num].Destinations.length;
        numOfFlight++
      ) {
        if (
          !sortedDestinations.includes(
            this.props.airlines[num].Destinations[numOfFlight]
          )
        )
          sortedDestinations.push(
            this.props.airlines[num].Destinations[numOfFlight]
          );
      }
    }
    sortedDestinations = sortedDestinations.sort((a, b) => a.localeCompare(b));

    this.setState({ destinations: sortedDestinations });
  }
  onHandleSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch(
      this.state.ticketPrice,
      this.state.destination,
      this.state.arrivalDate,
      this.state.departureDate
    );
  };
  getTodaysDate = () => {
    var date =
      new Date().getDate().toString() +
      "-" +
      (new Date().getMonth() < 10 ? "0" : "") +
      (new Date().getMonth() + 1).toString() +
      "-" +
      new Date().getFullYear().toString();

    return date;
  };
  onHandleChange = (e) => {
    if (e.target.id.includes("auto-complete-destinations")) {
      this.setState({ destination: e.target.textContent });
      return;
    }

    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const defaultProps = {
      options: this.state.destinations,
      getOptionLabel: (option) => option,
    };

    return (
      <div className="searchForm">
        <ValidatorForm>
          <div className="searchFormRow">
            <div className="searchFormCell" id="ticketPrice">
              <TextValidator label="Ticket Price" name="ticketPrice" />
            </div>
            <div className="searchFormCell">
              <Autocomplete
                {...defaultProps}
                id="auto-complete-destinations"
                autoComplete
                name="destination"
                onChange={this.onHandleChange}
                includeInputInList
                renderInput={(params) => (
                  <TextField {...params} label="Destination" margin="normal" />
                )}
              />
            </div>
          </div>
          <br />
          <div className="searchFormRow">
            <div className="searchFormCell">
              <TextField
                id="date"
                label="Arrival Date"
                type="date"
                name="arrivalDate"
                onChange={this.onHandleChange}
                defaultValue={
                  new Date().getFullYear().toString() +
                  "-" +
                  (new Date().getMonth() < 10 ? "0" : "") +
                  (new Date().getMonth() + 1).toString() +
                  "-" +
                  new Date().getDate().toString()
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="searchFormCell">
              <TextField
                id="date"
                label="Departure Date"
                type="date"
                name="departureDate"
                onChange={this.onHandleChange}
                defaultValue={
                  new Date().getFullYear().toString() +
                  "-" +
                  (new Date().getMonth() < 10 ? "0" : "") +
                  (new Date().getMonth() + 1).toString() +
                  "-" +
                  new Date().getDate().toString()
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <br />
          <div className="searchFormRow">
            <Button
              variant="contained"
              id="searchButton"
              color="primary"
              to="/flights/airlines"
              component={Link}
              onClick={this.onHandleSubmit}
            >
              Search
            </Button>
          </div>
        </ValidatorForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  airlines: state.flightReducer.airlines,
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: (ticketPrice, destination, arrivalDate, departureDate) =>
    dispatch(search(ticketPrice, destination, arrivalDate, departureDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
