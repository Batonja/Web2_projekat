import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import TextField from "@material-ui/core/TextField";
import { parseDateToString } from "../Common/Helpers/dateHelper";
import { getSeatPrice } from "../Common/Helpers/ticketPriceHelpers";
class FlightBasicInformation extends Component {
  render() {
    var flightHoursSplit = String(this.props.flight.tripLength).split(".");
    var tripLengthHours = flightHoursSplit[0];
    if (flightHoursSplit[1] !== undefined) {
      var tripLengthMinutes =
        flightHoursSplit[1].charAt(0) === 0
          ? flightHoursSplit[1].substring(1)
          : flightHoursSplit[1].concat("0");
    }
    return (
      <>
        {this.props.flight === undefined ? (
          ""
        ) : (
          <>
            <Col md="auto" className="flightItem">
              <TextField
                label="Company"
                value={this.props.airline.title}
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Col>
            <Col md="auto" className="flightItem">
              <TextField
                label="From"
                value={this.props.flight.fromDestination.title}
              ></TextField>
            </Col>
            <Col md="auto" className="flightItem">
              <TextField
                label="Destination"
                value={this.props.flight.toDestination.title}
              ></TextField>
            </Col>
            <Col md="auto" className="flightItem">
              <TextField
                label="Departure"
                value={parseDateToString(this.props.flight.departureDate)}
              ></TextField>
            </Col>
            <Col md="auto" className="flightItem">
              <TextField
                label="Arrival"
                value={parseDateToString(this.props.flight.arrivalDate)}
              ></TextField>
            </Col>
            {this.props.flight.tickets[1] !== undefined ? (
              <Col md="auto" className="flightItem">
                <TextField
                  label="Economy"
                  value={this.props.flight.tickets[1].price}
                ></TextField>
              </Col>
            ) : (
              ""
            )}

            {this.props.flight.tickets[0] !== undefined ? (
              <Col md="auto" className="flightItem">
                <TextField
                  label="Business"
                  value={this.props.flight.tickets[0].price}
                ></TextField>
              </Col>
            ) : (
              ""
            )}

            <Col md="auto" className="flightItem">
              <TextField
                label="Trip Length"
                value={
                  tripLengthHours > 0
                    ? tripLengthHours + " Hours "
                    : "" + tripLengthMinutes === NaN
                    ? ""
                    : +tripLengthMinutes + " Minutes"
                }
              />
            </Col>
          </>
        )}
      </>
    );
  }
}

export default FlightBasicInformation;
