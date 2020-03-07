import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import siteName from "../common/siteName";
class componentName extends Component {
  render() {
    return (
      <div className="footer">
        <ListGroup>
          <ListGroupItem className="copyright">
            Copyright. {siteName.Text} All rights reserved
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default componentName;
