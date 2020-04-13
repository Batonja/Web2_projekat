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
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";

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
    this.props.onSearch(
      [
        this.state.sliderValue[0] * this.state.sliderScaleFactor,
        this.state.sliderValue[1] * this.state.sliderScaleFactor,
      ],
      this.state.destination,
      "",
      ""
    );
    this.setState({
      departureDate: this.getTodaysDate(),
      arrivalDate: this.getTodaysDate(),
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
    var arrivalDate = this.state.arrivalDate;
    var departureDate = this.state.departureDate;
    if (this.state.arrivalDate !== "") {
      var arrivalDateSplited = this.state.arrivalDate.split("-");
      arrivalDate =
        arrivalDateSplited[2] +
        "/" +
        arrivalDateSplited[1] +
        "/" +
        arrivalDateSplited[0];
    }
    if (this.state.departureDate !== "") {
      var departureDateSplited = this.state.departureDate.split("-");
      departureDate =
        departureDateSplited[2] +
        "/" +
        departureDateSplited[1] +
        "/" +
        departureDateSplited[0];
    }

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
  onHandleChange = (e, newValue) => {
    if (e.target.parentElement.id === "slider-price") {
      this.setState({ sliderValue: newValue });
    }

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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  id="dateArrival"
                  name="arrivalDate"
                  label="Arrival Date"
                  variant="inline"
                  format="dd/MM/yyyy"
                  onChange={this.onHandleChange}
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
                  onChange={this.onHandleChange}
                  format="dd/MM/yyyy"
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
