import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destinations: []
    };
  }

  componentDidMount() {
    this.getDestinations();
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

  render() {
    const defaultProps = {
      options: this.state.destinations,
      getOptionLabel: option => option
    };

    return (
      <div className="searchForm">
        <ValidatorForm>
          <div className="searchFormRow">
            <div className="searchFormCell" id="ticketPrice">
              <TextValidator label="Ticket Price" />
            </div>
            <div className="searchFormCell">
              <Autocomplete
                {...defaultProps}
                id="auto-complete"
                autoComplete
                includeInputInList
                renderInput={params => (
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
                defaultValue={
                  new Date().getFullYear().toString() +
                  "-" +
                  (new Date().getMonth() < 10 ? "0" : "") +
                  (new Date().getMonth() + 1).toString() +
                  "-" +
                  new Date().getDate().toString()
                }
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            <div className="searchFormCell">
              <TextField
                id="date"
                label="Departure Date"
                type="date"
                defaultValue={
                  new Date().getFullYear().toString() +
                  "-" +
                  (new Date().getMonth() < 10 ? "0" : "") +
                  (new Date().getMonth() + 1).toString() +
                  "-" +
                  new Date().getDate().toString()
                }
                InputLabelProps={{
                  shrink: true
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
            >
              Search
            </Button>
          </div>
        </ValidatorForm>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  airlines: state.flightReducer.airlines
});

export default connect(mapStateToProps)(Search);
