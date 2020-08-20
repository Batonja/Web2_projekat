import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FlightBasicInformation from "../Preview/FlightBasicInformation";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import { luggageTypes } from "../../../common/constants";
import EditModal from "./EditModal";
import AddAirlineForm from "./AddAirlineForm";
import getFlightLuggage from "../../../actions/Flight/getFlightLuggage";
import AddFligthForm from "./AddFlightForm";
import getAirlines from "../../../actions/Flight/getAirlines";
import AddDestinationForm from "./AddDestinationForm";
import getDestinations from "../../../actions/Flight/getDestinations";
import Spinner from "react-bootstrap/Spinner";

const modalStyle = { "z-index": "1200" };

class FlightAdminPanel extends Component {
  constructor(props) {
    super(props);
    this.props.onGetFlightLuggage();
    this.props.onGetDestinations();
    this.state = {
      openedModal: -1,
      adding: false,
      openedModalAddAirline: false,
      openedModalAddFlight: false,
      openedModalAddDestination: false,
      openedModalEditAirline: -1,
    };
  }

  componentDidMount() {
    this.props.onGetAirlines();
  }

  openCloseAddDestinationModal = () => {
    if (this.state.openedModalAddDestination)
      this.setState({ openedModalAddDestination: false });
    else this.setState({ openedModalAddDestination: true });
  };

  openCloseAddAirlineModal = () => {
    if (this.state.openedModalAddAirline)
      this.setState({ openedModalAddAirline: false });
    else this.setState({ openedModalAddAirline: true });
  };

  openCloseAddFlightModal = () => {
    if (this.state.openedModalAddFlight)
      this.setState({ openedModalAddFlight: false });
    else this.setState({ openedModalAddFlight: true });
  };
  closeModal = () => {
    this.setState({ openedModal: -1 });
  };
  openModal = (e, id) => {
    e.preventDefault();
    this.setState({ openedModal: id });
  };

  openAirlineEdit = (e, id) => {
    e.preventDefault();
    this.setState({ openedModalEditAirline: id });
  };

  closeAirlineEdit = () => {
    this.setState({ openedModalEditAirline: -1 });
  };

  availableLuggageArrayToString = (availableFlightLuggage) => {
    var retVal = "";

    if (availableFlightLuggage === undefined) return "NONE";

    for (var index = 0; index < availableFlightLuggage.length; index++) {
      retVal +=
        luggageTypes[
          availableFlightLuggage[index].flightLuggage.flightLuggageType
        ] + (index === availableFlightLuggage.length - 1 ? "" : ",");
    }

    return retVal;
  };

  airlineDestinationsArrayToString = (airlineDestinations) => {
    var retVal = "";

    if (airlineDestinations === undefined) return "NONE";

    for (var index = 0; index < airlineDestinations.length; index++) {
      retVal +=
        airlineDestinations[index].destination.title +
        (index === airlineDestinations.length - 1 ? "" : ",");
    }

    return retVal;
  };

  render() {
    return this.props.loading ? (
      <div>
        <Spinner animation="border" />
      </div>
    ) : (
      <div className="flightsTable">
        <h2 className="flightsTableTitle">Panel</h2>
        <br />
        <Button
          onClick={(e) => this.openCloseAddFlightModal(e)}
          variant="contained"
          color="primary"
        >
          Add Flight
        </Button>

        <Button
          onClick={(e) => this.openCloseAddAirlineModal(e)}
          variant="contained"
          color="primary"
        >
          Add Airline
        </Button>

        <Button
          onClick={(e) => this.openCloseAddDestinationModal(e)}
          variant="contained"
          color="primary"
        >
          Add Destination
        </Button>
        <Modal
          size="lg"
          onHide={(e) => this.openCloseAddFlightModal(e)}
          style={modalStyle}
          ariaHideApp={false}
          show={this.state.openedModalAddFlight}
          onRequestClose={(e) => this.openCloseAddFlightModal(e)}
        >
          <AddFligthForm
            airlines={this.props.airlines}
            flightLuggage={this.props.flightLuggage}
            destinations={this.props.allDestinations}
            closeForm={this.openCloseAddFlightModal}
          />
        </Modal>

        <Modal
          size="lg"
          onHide={(e) => this.openCloseAddAirlineModal(e)}
          style={modalStyle}
          ariaHideApp={false}
          show={this.state.openedModalAddAirline}
          onRequestClose={(e) => this.openCloseAddAirlineModal(e)}
        >
          <AddAirlineForm
            closeForm={this.openCloseAddAirlineModal}
            flightLuggage={this.props.flightLuggage}
            destinations={this.props.allDestinations}
          />
        </Modal>
        <Modal
          size="lg"
          onHide={(e) => this.openCloseAddDestinationModal(e)}
          style={modalStyle}
          ariaHideApp={false}
          show={this.state.openedModalAddDestination}
          onRequestClose={(e) => this.openCloseAddDestinationModal(e)}
        >
          <AddDestinationForm closeForm={this.openCloseAddDestinationModal} />
        </Modal>
        <br />
        <br />

        {this.props.airlines === undefined
          ? ""
          : Array.from(this.props.airlines).map((airline, index) => {
              return airline === null ? (
                ""
              ) : (
                <Container fluid className="flightWrap">
                  <Row className="flightPresentRow">
                    <Col md="auto">
                      <TextField
                        label="Company"
                        value={airline.title}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    </Col>
                    <Col md="auto">
                      <TextField
                        label="Address"
                        value={airline.address}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    </Col>
                    <Col md="auto">
                      <TextField
                        label="Description"
                        value={airline.description}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    </Col>
                    <Col md="auto">
                      <TextField
                        label="Available Flight Luggage"
                        value={this.availableLuggageArrayToString(
                          airline.availableFlightLuggage
                        )}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    </Col>

                    <Col md="auto">
                      <TextField
                        label="Airline Destinations"
                        value={this.airlineDestinationsArrayToString(
                          airline.airlineDestinations
                        )}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    </Col>

                    <Col md="auto">
                      <Button
                        onClick={(e) =>
                          this.openAirlineEdit(e, airline.airlineId)
                        }
                        variant="contained"
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Modal
                        size="lg"
                        onHide={(e) => this.closeAirlineEdit(e)}
                        style={modalStyle}
                        ariaHideApp={false}
                        show={
                          airline.airlineId ===
                          this.state.openedModalEditAirline
                            ? true
                            : false
                        }
                        onRequestClose={(e) => this.closeAirlineEdit(e)}
                      >
                        <AddAirlineForm
                          mode="EDIT"
                          airline={airline}
                          closeForm={this.openCloseAddAirlineModal}
                          flightLuggage={this.props.flightLuggage}
                          destinations={this.props.allDestinations}
                        />
                      </Modal>
                    </Col>
                  </Row>
                  <br />
                </Container>
              );
            })}

        {this.props.airlines === undefined ? (
          ""
        ) : (
          <div>
            <h3>Flights</h3>

            {Array.from(this.props.airlines).map((airline, index) => {
              return airline.flights === undefined || airline.flights === null
                ? ""
                : Array.from(airline.flights).map((flight, flightIndex) => {
                    return (
                      <div>
                        <Container fluid className="flightWrap">
                          <Row className="flightPresentRow">
                            <FlightBasicInformation
                              airline={airline}
                              flight={flight}
                            />
                            <Col md="auto" className="flightItem">
                              <Button
                                onClick={(e) =>
                                  this.openModal(e, flight.flightId)
                                }
                                variant="contained"
                                color="primary"
                              >
                                Edit
                              </Button>
                              <Modal
                                size="lg"
                                onHide={(e) => this.closeModal(e)}
                                style={modalStyle}
                                ariaHideApp={false}
                                show={
                                  flight.flightId === this.state.openedModal
                                    ? true
                                    : false
                                }
                                onRequestClose={(e) => this.closeModal(e)}
                              >
                                <EditModal
                                  mode="EDIT"
                                  flight={flight}
                                  airline={airline}
                                />
                              </Modal>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    );
                  });
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  airlines: state.flightReducer.airlines,
  flightLuggage: state.flightReducer.flightLuggage,
  loading: state.loadingReducer.loading,
  allDestinations: state.flightReducer.allDestinations,
});
const mapDispatchToProps = (dispatch) => ({
  onGetFlightLuggage: () => dispatch(getFlightLuggage()),
  onGetAirlines: () => dispatch(getAirlines()),
  onGetDestinations: () => dispatch(getDestinations()),
});
export default connect(mapStateToProps, mapDispatchToProps)(FlightAdminPanel);
