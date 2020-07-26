import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import filter from "../../actions/Flight/filter";
import loadingData from "../../actions/Loading/loadingData";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripLengthOptions: [
        { value: -1, label: "< 1 Hour" },
        { value: 1, label: "1-5 Hours" },
        { value: 5, label: "> 5 Hours" },
      ],
      selectedAirlines: [],
      selectedTripLength: -1,
    };
  }

  onHandleSubmit = (selectedAirlines, selectedTripLength) => {
    var filterObject = { Airlines: [], TripLengthOption: {} };

    for (
      var selectedAirlineIndex = 0;
      selectedAirlineIndex < selectedAirlines.length;
      selectedAirlineIndex++
    ) {
      var Airline = {
        AirlineId: selectedAirlines[selectedAirlineIndex].value,
        Title: selectedAirlines[selectedAirlineIndex].label,
      };
      filterObject.Airlines.push(Airline);
    }

    filterObject.TripLengthOption = selectedTripLength.value;

    this.props.onApplyFilters(filterObject);
  };

  onChangeTripLengthOptions = (event) => {
    if (event === null) {
      this.setState({ selectedTripLength: "" });
      event = "";
      return;
    }
    this.setState({ selectedTripLength: event });
    this.onHandleSubmit(this.state.selectedAirlines, event);
  };

  onChangeAirlinesOptions = (event) => {
    if (event === null) {
      this.setState({ selectedAirlines: [] });
      event = "";
    }
    this.setState({ selectedAirlines: event });
    this.onHandleSubmit(event, this.state.selectedTripLength);
  };
  render() {
    var airlineOptions = [];

    for (
      var indexOfAirline = 0;
      indexOfAirline < this.props.airlines.length;
      indexOfAirline++
    ) {
      if (
        this.props.airlines[indexOfAirline].flights &&
        this.props.airlines[indexOfAirline].flights.length > 0
      ) {
        const airlineOption = {
          value: this.props.airlines[indexOfAirline].airlineId,
          label: this.props.airlines[indexOfAirline].title,
        };
        airlineOptions.push(airlineOption);
      }
    }

    return (
      <Container
        style={{
          border: "1px solid black",
          "margin-left": "6px",
          "margin-top": "10px",
          width: "400px",
        }}
      >
        <Row>
          <Col lg={8}>
            <h2 style={{ "margin-left": "50%" }}>Filters</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Select
              placeholder="Airlines"
              closeMenuOnSelect={false}
              onChange={(e) => this.onChangeAirlinesOptions(e)}
              isMulti
              options={airlineOptions}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Select
              placeholder="Trip Length"
              closeMenuOnSelect={false}
              value={this.state.selectedTripLength}
              onChange={(e) => this.onChangeTripLengthOptions(e)}
              options={this.state.tripLengthOptions}
            ></Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={12}></Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  airlines: state.flightReducer.airlines,
});

const mapDispatchToProps = (dispatch) => ({
  onApplyFilters: (airlines, tripLengthArray) =>
    dispatch(filter(airlines, tripLengthArray)),
  onLoading: () => dispatch(loadingData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
