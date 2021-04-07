import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import RentACarServiceModal from "./Car/Utilities/RentACarServiceModal";
import { RentACarService } from "app/models/rentACarService";

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

  useEffect(() => {
    const {RentACarServices} = props
    console.log(RentACarServices)
  }, [])

  const { classes } = props
  const {RentACarServices} = props
  return (
    <div className={classes.componentCarsSectionContainer}>
        {RentACarServices.map((service) =>
            <RentACarServiceModal rentACarService = {service}/>
        )}
    </div>
  );

}

const mapStateToProps = (state) => ({
  RentACarServices: state.carsReducer.rentACarServices,
})



 export default connect(mapStateToProps, null)(withStyles(styles)(Home))

