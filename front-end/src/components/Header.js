import React, { Component } from "react";
import siteName from "../common/siteName";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h2 className="title">{siteName.Text}</h2>
      </div>
    );
  }
}

export default Header;
