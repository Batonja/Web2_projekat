import React, { useEffect } from "react";
import Footer from "./components/Footer";
//import Navigation from "./components/Navigation";
import { Routes } from "./common/routes";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navigation/Navbar'
//import agent from "app/api/agent";
import populateRentACarServices from "actions/Cars/populateRentACar";
import { connect } from "react-redux";



function App(props) {

  useEffect(()=>{

    props.PopulateRentACarServices();

  },[])

  return (
    <div >
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

export default connect(null,mapDispatchToProps)(App);