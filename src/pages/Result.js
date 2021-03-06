import {Container} from "react-bootstrap";
import PersonCard from "../fragments/PersonCard";
import {useLocation} from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const {wins} = location.state;
    return (
        <Container>
            <p1>๋๊ทธ ์ ํ</p1>
            <PersonCard
                id={wins.id}
                name={wins.name}
                picture={wins.picture}
            />
        </Container>
    )
};

export default Result;
