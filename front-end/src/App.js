import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { Routes } from "./common/routes";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Navigation />
      <Routes />
      <Footer />
    </Router>
    
  );
}

export default App;
