import React, { Component } from "react";
import { Routes } from "../common/routes";
import Navigation from "../components/Navigation";

class Header extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Routes />
      </div>
    );
  }
}

export default Header;
