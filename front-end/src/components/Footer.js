import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import siteName from "../common/siteName";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class componentName extends Component {
  render() {
    return (
      <div className="footer">
        <Container>
          <Row className="copyright">
            <Col>Copyright. {siteName.Text} All rights reserved</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default componentName;
