import React from "react";
import { Container } from "react-bootstrap";
export default (props) => {
    const status = props.status === 1 ? "status-success" : (props.status === 2) ? "status-warning" : "status-error";
    return (
        <Container className="center">
            <h1 className={status}>
                {props.errMessage}
            </h1>
        </Container>
    );
};