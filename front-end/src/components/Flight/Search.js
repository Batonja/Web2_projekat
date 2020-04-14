import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import search from "../../actions/Flight/search";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destinations: [],
      departureDate: "",
      arrivalDate: "",
      destination: "",
      ticketPrice: 0,
      sliderValue: [0, 100],
      sliderScaleFactor: 100,
    };
  }

  componentDidMount() {
    this.getDestinations();

    this.setState({
      departureDate: new Date(),
      arrivalDate: new Date(),
    });
  }

  parseDate = (date) => {
    var dateFormat = new Date(date);
    var dateString =
      (dateFormat.getDate() < 10 ? "0" : "") +
      dateFormat.getDate().toString() +
      "/" +
      (dateFormat.getMonth() < 10 ? "0" : "") +
      (dateFormat.getMonth() + 1).toString() +
      "/" +
      dateFormat.getFullYear().toString();

    return dateString;
  };

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
    var arrivalDate = this.parseDate(this.state.arrivalDate);
    var departureDate = this.parseDate(this.state.departureDate);

    this.props.onSearch(
      [
        this.state.sliderValue[0] * this.state.sliderScaleFactor,
        this.state.sliderValue[1] * this.state.sliderScaleFactor,
      ],
      this.state.destination,
      arrivalDate,
      departureDate
    );
  };
  getTodaysDate = () => {
    var date =
      new Date().getDate().toString() +
      "/" +
      (new Date().getMonth() < 10 ? "0" : "") +
      (new Date().getMonth() + 1).toString() +
      "/" +
      new Date().getFullYear().toString();

    return date;
  };
  sliderValueText = (value) => {
    if (value > 1000) {
      value = value / 1000;
      value = value.toString() + "k$";
    }

    return value;
  };
  onHandleDateChange = (event, name) => {
    if (name.includes("Arrival")) {
      this.setState({ arrivalDate: event });
    }
    if (name.includes("Departure")) {
      this.setState({ departureDate: event });
    }
  };

  onHandleChange = (e, newValue) => {
    if (e.target.parentElement.id === "slider-price") {
      this.setState({ sliderValue: newValue });
    }

    if (
      e.target.id.includes("auto-complete-destinations") ||
      e.target.id === ""
    ) {
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
            <div
              className="searchFormCell"
              style={{ "margin-top": "6%", "margin-right": "10px" }}
            >
              <Typography id="priceRangeLabel" gutterBottom variant="label">
                Price range
              </Typography>

              <Slider
                id="slider-price"
                min={0}
                max={100}
                scale={(x) => x * this.state.sliderScaleFactor}
                step={0.1}
                value={this.state.sliderValue}
                onChange={this.onHandleChange}
                valueLabelDisplay="auto"
                aria-labelledby="priceRangeLabel"
                getAriaValueText={this.sliderValueText}
                valueLabelFormat={this.sliderValueText}
              />
            </div>

            <div className="searchFormCell">
              <Autocomplete
                {...defaultProps}
                id="auto-complete-destinations"
                autoComplete
                name="destination"
                onChange={this.onHandleChange}
                OnClea
                includeInputInList
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={this.onHandleChange}
                    id="Lol"
                    label="Destination"
                    margin="normal"
                  />
                )}
              />
            </div>
          </div>

          <br />
          <div className="searchFormRow">
            <div className="searchFormCell">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  id="dateArrival"
                  name="arrivalDate"
                  label="Arrival Date"
                  variant="inline"
                  format={"dd/MM/yyyy"}
                  onChange={(e) => this.onHandleDateChange(e, "dateArrival")}
                  value={this.state.arrivalDate}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="searchFormCell">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  id="dateDeparture"
                  label="Departure Date"
                  variant="inline"
                  name="departureDate"
                  onChange={(e) => this.onHandleDateChange(e, "dateDeparture")}
                  format={"dd/MM/yyyy"}
                  value={this.state.departureDate}
                />
              </MuiPickersUtilsProvider>
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
