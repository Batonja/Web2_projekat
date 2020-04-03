import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class InviteFriend extends Component {
    render() {
        return (
            <>

            <Container>
            {Array.from(this.props.friends).map((friend,i) => {
                return(
                <Row>
                    <div>{friend}</div>
                </Row>)
            })}
            </Container>
            </>
        );
    }
}

export default InviteFriend;