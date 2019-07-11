import React from "react";
import Card from "react-bootstrap/Card";
export default (props) => {
    return (
        <Card border="light">
            <Card.Header className="text-center">{props.header}</Card.Header>
            <Card.Body>
                <Card.Text className="text-center">
                    {props.content}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};