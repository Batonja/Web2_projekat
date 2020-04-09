import React, { useState,useEffect } from "react";
import AddVehicleForm from './Forms/AddVehicleForm'
import CarOrdersModal from './CarOrdersModal'
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {compose } from 'redux'

const useStyles = makeStyles({

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

  const classes = new useStyles();
  const { rentACarServices } = props
  useEffect(()=>{
    console.log(rentACarServices[0].Vehicles)
  })
  return (
    <div className={classes.carPageFlexContainer}>
      <h3>Cars Page</h3>
      {/* <AddVehicleForm/> */}
      {rentACarServices[0].Vehicles.map((car,index) => 
        
        (<CarOrdersModal key= {index} vehicle={car} />)
      , rentACarServices[0].Vehicles)}

    </div>
  );


}

const mapStateToProps = (state) => ({
  rentACarServices: state.carsReducer.rentACarServices
});



export default connect(mapStateToProps)(Car)




