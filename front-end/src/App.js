import React, { useEffect } from "react";
import Footer from "./components/Footer";
//import Navigation from "./components/Navigation";
import { Routes } from "./common/routes";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navigation/Navbar'
//import agent from "app/api/agent";
import populateRentACarServices from "actions/Cars/populateRentACar";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({

  // root:{
  //   display: "flex",
  //   justifyContent: "center",
  //   flextDirection: "column",
  //   width: "100%",
  
  // }
})


function App(props) {

  useEffect(()=>{

    props.PopulateRentACarServices();

  },[])

  const { classes } = props

  return (
    <div className ={classes.root}>
      <Router>
        <Navbar  />
        <br/><br/><br/>
        <div>
          <Routes/>
        </div>
        <Footer/>
        <br/><br/>
      </Router>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  PopulateRentACarServices: () => dispatch(populateRentACarServices())
})

export default connect(null,mapDispatchToProps)(withStyles(styles)(App));