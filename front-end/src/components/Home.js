import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import RentACarServices from './Car/Utilities/RentACarServices'
import Airlines from  './Flight/Airlines'

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  componentCarsSectionContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: "center",
  },

  tabeleHomeMain: {
      width: "80%",
      justifyContent: 'right',
      alignItems: 'right',
      textAlign: "right",
      beckgroungColor: "#3F51B5",
      color: "#3F51B5"
  },
  modalHeaders: {
      textAlign: "left",
      fontWeight: "bold",
      color: "#ff4d07"
      
  },

})

const Home = (props) => {
  

 
    const {classes} = props
    return (
      <div className ={classes.componentCarsSectionContainer}>

        <Table className ={classes.tabeleHomeMain}>
          <TableHead>
            <TableCell><h1 style={{ fontWeight: "bold", }}>Flights</h1></TableCell>
            <TableCell><h1 style={{ fontWeight: "bold", }}>Rent A Car</h1></TableCell>
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

        <Airlines/>
        <RentACarServices/>
      </div>
    );
  
}

export default withStyles(styles)(Home);
