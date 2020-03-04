import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
class Navigation extends Component {
  render() {
    return (
      <div>
        <Link to="/flights">
          <h3>Flight</h3>
        </Link>

        <Link to="/hotels">
          <h3>Hotel</h3>
        </Link>
        <Link to="/cars">
          <h3>Cars</h3>
        </Link>
      </div>
    );
  }
}

export default Navigation;
