import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";

class Home extends Component {


  render() {
    return (
      <div>
        <h2>Greetings</h2>
        <Table>
          <TableHead>
            <TableCell>Flights</TableCell>
            <TableCell>Cars</TableCell>
          </TableHead>
          <TableBody>
            <TableCell>
              <IconButton to="/flights" component={Link}>
                <AirplanemodeActiveIcon fontSize="large" />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton to="/cars" component={Link}>
                <DriveEtaIcon fontSize="large" />
              </IconButton>
            </TableCell>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Home;
