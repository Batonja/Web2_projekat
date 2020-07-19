import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Collapse } from "react-collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import getAirlines from "../../actions/Flight/getAirlines";
import Spinner from "react-bootstrap/Spinner";

const styles = (theme) => ({
  componentServicesContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  tabeleServices: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    beckgroungColor: "#3F51B5",
    color: "#3F51B5",
  },
  modalHeaders: {
    textAlign: "left",
    fontWeight: "bold",
    color: "#ff4d07",
  },
});

class Airlines extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedCollapsed: [],
    };
  }

  componentDidMount() {
    this.props.OnGetAirlines();
  }

  isOpened(index) {
    if (this.state.openedCollapsed.includes(index)) return true;

    return false;
  }

  openClose(index) {
    if (this.state.openedCollapsed.includes(index)) {
      var filteredArray = this.state.openedCollapsed.filter(
        (item) => item !== index
      );
      this.setState({ openedCollapsed: filteredArray });
      return;
    }
    this.setState({ openedCollapsed: [...this.state.openedCollapsed, index] });
  }
  render() {
    const { classes } = this.props;

    return this.props.loading ? (
      <Spinner animation="border" />
    ) : Array.from(this.props.airlines).length !== 0 ? (
      <div className={classes.componentServicesContainer}>
        <Table className={classes.tabeleServices}>
          <TableHead>
            <TableCell>
              <h3 style={{ fontWeight: "bold" }}> Airline Title</h3>
            </TableCell>

            <TableCell>
              <h3 style={{ fontWeight: "bold" }}> Address</h3>
            </TableCell>
            <TableCell>
              <h3 style={{ fontWeight: "bold" }}> Description </h3>
            </TableCell>

            <TableCell></TableCell>
          </TableHead>

          {Array.from(this.props.airlines).map((airline, i) => {
            return (
              <TableBody>
                <TableRow onClick={() => this.openClose(i)}>
                  <TableCell>
                    <h6 className={classes.modalHeaders}>{airline.title}</h6>
                  </TableCell>
                  <TableCell>
                    <h6 className={classes.modalHeaders}>{airline.address}</h6>
                  </TableCell>
                  <TableCell>
                    <h6 className={classes.modalHeaders}>
                      {airline.description}
                    </h6>
                  </TableCell>
                  <TableCell>
                    {this.isOpened(i) ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </TableCell>
                </TableRow>

                <Collapse isOpened={this.isOpened(i)} eventKey={i}>
                  <TableRow>
                    Destinations:{" "}
                    <List>
                      {this.props.airlines[i].airlineDestinations
                        ? Array.from(
                            this.props.airlines[i].airlineDestinations
                          ).map((destination, i) => {
                            return <ListItem>{destination.title}</ListItem>;
                          })
                        : ""}
                    </List>{" "}
                  </TableRow>
                </Collapse>
              </TableBody>
            );
          })}
        </Table>
      </div>
    ) : (
      ""
    );
  }
}

const mapStateToProps = (state) => ({
  airlines: state.flightReducer.airlines,
  loading: state.loadingReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  OnGetAirlines: () => dispatch(getAirlines()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Airlines));
