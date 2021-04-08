import { useState, useEffect } from 'react';
import axios from 'axios';
import {CardGroup, Container} from "react-bootstrap";
import PersonCard from "../fragments/PersonCard";
import {useLocation, useHistory, Redirect} from "react-router-dom";

const getRandomIndexes = (max, length) => {
    const isDuplicate = (arr, randNum) =>
        arr.reduce((dupCnt, arrVal) => arrVal === randNum, false);
    let array = [];

    for (let i = 0; i < max; ++i) {
        let randIdx = 0;
        do {
            randIdx = Math.floor(Math.random() * length);
        } while (isDuplicate(array, randIdx));

        array.push(randIdx);
    }

    return array;
}

const getNewSelection = (people) => {
    const list = people.filter(p => !p.isSelected);
    const idxes = getRandomIndexes(2, list.length);
    return [
        list[idxes[0]],
        list[idxes[1]],
    ];
}

const getModifiedPeopleArray = (people, id, modifiedData) => {
    // Find clicked person.
    const clickedPersonIndex = people.findIndex(a => a.id === id);
    const clickedPerson = people[clickedPersonIndex];

    // Create new person object, set isSelected to true, and update people data.
    const newClickedPerson = {...clickedPerson, ...modifiedData};
    const copy = [...people];
    copy.splice(clickedPersonIndex, 1, newClickedPerson);

    return copy;
}

const Game = () => {
    const location = useLocation();
    const history = useHistory();
    const {initialRound} = location.state;
    const [people, setPeople] = useState([]);
    const [displayedPeopleIds, setDisplayedPeopleIds] = useState([]);
    const [curRound, setCurRound] = useState(initialRound);
    const [curProgress, setCurProgress] = useState(1);
    const [maxProgress, setMaxProgress] = useState(curRound / 2);

    // Get selection datas from web
    useEffect(() => {
        async function Impl() {
            // Load people from the server.
            const result = await axios({
                url: 'https://randomuser.me/api/?results=' + initialRound,
                method: 'get'
            });

            // Transform.
            let transformed = result.data.results.map((person, idx) => {
                return {
                    id: idx,
                    name: Object.values(person.name).join(' '),
                    picture: person.picture.thumbnail,
                    isSelected: false,
                }
            });

            const newSelection = getNewSelection(transformed, initialRound, curRound);

            // Update
            setPeople(transformed);
            setDisplayedPeopleIds(newSelection);
        }
        Impl();
    }, []);

    const onClick = id => {
        // Set selected flag at clicked people and delete unselected people
        let newPeople = getModifiedPeopleArray(people, id, { isSelected: true })
        const unSelectedId = displayedPeopleIds.find(e => e.id !== id).id;
        newPeople = newPeople.filter(p => p.id !== unSelectedId);

        let curProgress_ = curProgress + 1;
        let maxProgress_ = maxProgress;
        let curRound_ = curRound;

        // If current round's progress finish, transfer to next round
        if (curProgress_ > maxProgress_) {
            curProgress_ = 1;
            maxProgress_ = maxProgress_ / 2;
            curRound_ = curRound_ / 2;

            newPeople = newPeople.map(people => {
                return {
                    ...people,
                    isSelected: false
                }
            });
        }

        // If game ends, route to result page
        if (curRound_ < 2) {
            console.log('Game Over');
            // TODO: Transfer to result page

            const win = displayedPeopleIds.find(e => e.id === id);
            history.push({ pathname: '/result', state: { wins: win }});
            return;
        }

        const newSelection = getNewSelection(newPeople);

        // Update state.
        setPeople(newPeople);
        setCurRound(curRound_);
        setCurProgress(curProgress_);
        setMaxProgress(maxProgress_);
        setDisplayedPeopleIds(newSelection);
    };

    return (
        <Container>
            <h1>{curRound === 2 ? '결승' : curRound + '강'} ({curProgress}/{maxProgress})</h1>

            {displayedPeopleIds.length > 0 ?
                (
                    <CardGroup>
                        {displayedPeopleIds.map(selection =>
                            <PersonCard
                                key={selection.id}
                                id={selection.id}
                                picture={selection.picture}
                                name={selection.name}
                                onSelectPeople={onClick}
                            />
                        )}
                    </CardGroup>
                ):
            <p>로딩중...</p>}
        </Container>
    )
}

export default Game;