import React from "react";
import { Card, Button } from 'react-bootstrap'

const PersonCard = ({
    id,
    name,
    picture,
    onSelectPeople
}) => {
    const handleClick = () => {
        onSelectPeople(id);
    };

    return (
        <Card>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                {(onSelectPeople) ? <Button onClick={handleClick} variant="success" size="lg" block>선택</Button> : ''}
            </Card.Body>
        </Card>
    )
}

export default PersonCard;