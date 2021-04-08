import React from "react";
import { Card, Button } from 'react-bootstrap'

const PersonCard = ({
    name,
    picture,
    onSelectPeople
}) => {
    return (
        <Card>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                {onSelectPeople &&
                    <Button onClick={onSelectPeople} variant="success" size="lg" block>선택</Button>
                }
            </Card.Body>
        </Card>
    );
};

export default PersonCard;
