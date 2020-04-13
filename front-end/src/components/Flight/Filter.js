import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import filter from "../../actions/Flight/filter";
import loadingData from "../../actions/Loading/loadingData";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airlinesOptions: [],
      tripLengthOptions: [
        { value: 0, label: "< 1 Hour" },
        { value: 1, label: "1-5 Hours" },
        { value: 2, label: "> 5 Hours" },
      ],
      selectedAirlines: [],
      selectedTripLenghts: [],
    };
  }

  componentDidMount() {
    var airlinesOptions = [];

    for (
      var indexOfAirline = 0;
      indexOfAirline < this.props.airlines.length;
      indexOfAirline++
    ) {
      const airlineOption = {
        value: this.props.airlines[indexOfAirline].Id,
        label: this.props.airlines[indexOfAirline].Title,
      };
      airlinesOptions.push(airlineOption);
    }
    this.setState({ airlinesOptions: airlinesOptions });
  }

  onHandleSubmit = (selectedAirlines, selectedTripLenghts) => {
    this.props.onApplyFilters(selectedAirlines, selectedTripLenghts);
  };

  onChangeTripLengthOptions = (event) => {
    if (event === null) {
      this.setState({ selectedTripLenghts: [] });
      event = "";
    }
    this.setState({ selectedTripLenghts: event });
    this.onHandleSubmit(this.state.selectedAirlines, event);
  };

  onChangeAirlinesOptions = (event) => {
    if (event === null) {
      this.setState({ selectedAirlines: [] });
      event = "";
    }
    this.setState({ selectedAirlines: event });
    this.onHandleSubmit(event, this.state.selectedTripLenghts);
  };
  render() {
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
              options={this.state.airlinesOptions}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Select
              placeholder="Trip Length"
              closeMenuOnSelect={false}
              onChange={(e) => this.onChangeTripLengthOptions(e)}
              isMulti
              options={this.state.tripLengthOptions}
            />
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
