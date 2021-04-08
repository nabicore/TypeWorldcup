import {Container} from "react-bootstrap";
import PersonCard from "../fragments/PersonCard";
import {useLocation} from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const {wins} = location.state;
    console.log(`${wins.id} / ${wins.name} / ${wins.picture}`);
    return (
        <Container>
            <p1>느그 선택</p1>
            <PersonCard
                id={wins.id}
                name={wins.name}
                picture={wins.picture}
            />
        </Container>
    )
}

export default Result;