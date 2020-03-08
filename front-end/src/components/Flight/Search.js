import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
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
      <Autocomplete
        className="flightSearch"
        {...defaultProps}
        id="auto-complete"
        autoComplete
        includeInputInList
        renderInput={params => (
          <TextField {...params} label="autoComplete" margin="normal" />
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  airlines: state.flightRed.airlines
});

export default connect(mapStateToProps)(Search);
