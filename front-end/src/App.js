import React from "react";
import Footer from "./components/Footer";
//import Navigation from "./components/Navigation";
import { Routes } from "./common/routes";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navigation/Navbar'








function App(props) {
  const {classes} = props; 
  return (
    <div >
      <Router>
        <Navbar  />
        <br/><br/><br/><br/>
        <div>
          <Routes/>
        </div>
        <Footer/>
        <br/><br/>
      </Router>
    </div>
  );
}

export default (App);
