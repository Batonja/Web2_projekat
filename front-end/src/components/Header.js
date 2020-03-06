import React, { Component } from "react";
import { Routes } from "../common/routes";
import Navigation from "../components/Navigation";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h2 className="title">NAD Driving vehicles</h2>
        <Navigation />
        <Routes />
      </div>
    );
  }
}

export default Header;
