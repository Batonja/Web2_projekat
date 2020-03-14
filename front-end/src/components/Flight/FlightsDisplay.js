import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import { Collapse } from "react-collapse";

class FlightsDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedCollapsed: [],
      luggage: 0
    };
    this.openClose = this.openClose.bind(this);
  }
  isOpened(index) {
    if (this.state.openedCollapsed.includes(index)) return true;

    return false;
  }
  onHandleLuggageChange = event => {
    this.setState({ luggage: event.target.value });
  };
  openClose(event, index) {
    event.preventDefault();
    if (this.state.openedCollapsed.includes(index)) {
      var filteredArray = this.state.openedCollapsed.filter(
        item => item !== index
      );
      this.setState({ openedCollapsed: filteredArray });
      return;
    }
    this.setState({ openedCollapsed: [...this.state.openedCollapsed, index] });
  }

  render() {
    return (
      <div className="flightsTable">
        <h2 className="flightsTableTitle">Flights</h2>
        {Array.from(this.props.airlines).map((airline, i) => {
          return (
            <div>
              {Array.from(airline.Flights).map((flight, flightIndex) => {
                return (
                  <ListGroup className="flightWrap">
                    <ListGroup className="flightPresentRow">
                      <ListGroupItem className="flightItem">
                        <TextField
                          label="Company"
                          onChange={""}
                          value={airline.Title}
                        ></TextField>
                      </ListGroupItem>
                      <ListGroupItem className="flightItem">
                        <TextField
                          label="From"
                          onChange={""}
                          value={flight.From}
                        ></TextField>
                      </ListGroupItem>
                      <ListGroupItem className="flightItem">
                        <TextField
                          label="Destination"
                          onChange={""}
                          value={flight.To}
                        ></TextField>
                      </ListGroupItem>
                      <ListGroupItem className="flightItem">
                        <TextField
                          label="Departure"
                          onChange={""}
                          value={flight.DepartureDate}
                        ></TextField>
                      </ListGroupItem>
                      <ListGroupItem className="flightItem">
                        <TextField
                          label="Arrival"
                          onChange={""}
                          value={flight.DepartureDate}
                        ></TextField>
                      </ListGroupItem>
                      <ListGroupItem className="flightItem">
                        <TextField
                          label="Economy"
                          onChange={""}
                          value={flight.Price - airline.Tickets.Economy}
                        ></TextField>
                      </ListGroupItem>
                      <ListGroupItem className="flightItem">
                        <TextField
                          label="Business"
                          onChange={""}
                          value={flight.Price - airline.Tickets.Economy + 2}
                        ></TextField>
                      </ListGroupItem>
                      <ListGroupItem className="flightItem">
                        <Button onClick={e => this.openClose(e, flight.Id)}>
                          {this.isOpened(flight.Id) ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </Button>
                      </ListGroupItem>
                    </ListGroup>

                    <Collapse isOpened={this.isOpened(flight.Id)}>
                      <ListGroup className="flightPresentRow">
                        <ListGroupItem className="flightItem">
                          <InputLabel id="luggageLabel">
                            Luggage Type / Price
                          </InputLabel>
                          <Select
                            labelId="luggageLabel"
                            onChange={this.onHandleLuggageChange}
                            value={this.state.luggage}
                          >
                            <MenuItem value={0}>
                              {airline.Luggage[0].Type.toString() +
                                " / " +
                                airline.Luggage[0].Price.toString()}
                            </MenuItem>
                            <MenuItem value={1}>
                              {airline.Luggage[1].Type.toString() +
                                " / " +
                                airline.Luggage[1].Price.toString()}
                            </MenuItem>
                          </Select>
                        </ListGroupItem>
                      </ListGroup>
                    </Collapse>
                  </ListGroup>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  airlines: state.flightRed.airlines
});
export default connect(mapStateToProps)(FlightsDisplay);
