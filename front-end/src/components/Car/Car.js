import React, { useState } from "react";
import AddVehicleForm from './Forms/AddVehicleForm'
import CarOrdersModal from './CarOrdersModal'

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({

  carPageFlexContainer: {
    flexWrap: "nowrap",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
  },


});


const Car = (props) => {
  const { classes } = props

  return (
    <div className={classes.carPageFlexContainer}>
      <h3>Cars Page</h3>
      {/* <AddVehicleForm/> */}
      <CarOrdersModal />
    </div>
  );


}

export default withStyles(styles)(Car);


