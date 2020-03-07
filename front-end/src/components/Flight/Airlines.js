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

class Airlines extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openedCollapsed: []
    };
  }

  isOpened(index) {
    if (this.state.openedCollapsed.includes(index)) return true;

    return false;
  }

  openClose(index) {
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
    return Array.from(this.props.airlines).length !== 0 ? (
      <Table>
        <TableHead>
          <TableCell>
            {Array.from(Object.keys(this.props.airlines[0]))[0]}
          </TableCell>

          <TableCell>
            {Array.from(Object.keys(this.props.airlines[0]))[1]}
          </TableCell>

          <TableCell>
            {Array.from(Object.keys(this.props.airlines[0]))[2]}
          </TableCell>
          <TableCell></TableCell>
        </TableHead>

        {Array.from(this.props.airlines).map((airline, i) => {
          return (
            <TableBody>
              <TableRow onClick={() => this.openClose(i)}>
                <TableCell>{airline.Title}</TableCell>
                <TableCell>{airline.Address}</TableCell>
                <TableCell>{airline.Description}</TableCell>
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
                    {Array.from(this.props.airlines[i].Destinations).map(
                      (destination, i) => {
                        return <ListItem>{destination}</ListItem>;
                      }
                    )}
                  </List>{" "}
                </TableRow>
              </Collapse>
            </TableBody>
          );
        })}
      </Table>
    ) : (
      ""
    );
  }
}

const mapStateToProps = state => ({
  airlines: state.flightRed.airlines
});

export default connect(mapStateToProps)(Airlines);
