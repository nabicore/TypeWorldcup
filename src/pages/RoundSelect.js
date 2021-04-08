import React, {useState} from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Card,
    Button
} from "react-bootstrap";

const rounds = [
    4,
    8,
    16,
    32,
    64,
    128
];

const RoundSelect = () => {
    const [round, setRound] = useState(rounds[0]);

    return (
        <Container>
            <div className="center-block">
                <Card body>
                    <h1>아무렇게나 만든 이상형 월드컵</h1>
                    <h3>라운드를 선택해주시요</h3>
                    <select onChange={event => setRound(Number(event.target.value))}>
                        {rounds.map(round => {
                            return <option key={round} value={round.toString()}>{round}강</option>
                        })}
                    </select>
                    <Link to={{pathname: "/game", state: {initialRound: round}}}>
                        <Button variant="success">시작</Button>
                    </Link>
                </Card>
            </div>
        </Container>
    );
};

export default RoundSelect;
