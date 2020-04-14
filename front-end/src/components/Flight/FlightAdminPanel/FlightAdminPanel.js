import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FlightBasicInformation from "../Preview/FlightBasicInformation";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Modal from "react-bootstrap/Modal";
import EditModal from "./EditModal";

const modalStyle = { "z-index": "1200" };

class FlightAdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedModal: -1,
    };
  }

  closeModal = () => {
    this.setState({ openedModal: -1 });
  };
  openModal = (e, id) => {
    this.setState({ openedModal: id });
  };
  render() {
    return (
      <div className="flightsTable">
        <h2 className="flightsTableTitle">Panel</h2>
        {Array.from(this.props.airlines).map((airline, index) => {
          {
            return Array.from(airline.Flights).map((flight, flightIndex) => {
              return (
                <Container fluid className="flightWrap">
                  <Row className="flightPresentRow">
                    <FlightBasicInformation airline={airline} flight={flight} />
                    <Col md="auto" className="flightItem">
                      <Button
                        onClick={(e) => this.openModal(e, flight.Id)}
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
                          flight.Id === this.state.openedModal ? true : false
                        }
                        onRequestClose={(e) => this.closeModal(e)}
                      >
                        <EditModal flight={flight} airline={airline} />
                      </Modal>
                    </Col>
                  </Row>
                </Container>
              );
            });
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  airlines: state.flightReducer.allAirlines,
});

export default connect(mapStateToProps)(FlightAdminPanel);
