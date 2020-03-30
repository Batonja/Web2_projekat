import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import siteName from "../common/siteName";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../App.css'





class componentName extends Component {
  render() {
    return (
      <div className="costum-footer">
        <p>Copyright. {siteName.Text} All rights reserved</p>
      </div>
    );
  }
}

export default componentName;
