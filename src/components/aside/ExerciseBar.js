import React, {useEffect, useState} from 'react';
import CircleProcess from "../common/CircleProcess";
import {useSelector} from "react-redux";

const ExerciseBar = ({changeQuiz}) => {
    const exercises = useSelector(state => state.course.exercises);
    const [listObject, setListObject] = useState([]);

    useEffect(_ => {
        setListObject(new Set(exercises.map(item => item.levelId)))
        changeQuiz(exercises[0])
    }, [changeQuiz, exercises])
    return (
        <div className={'Aside__Tab'}>
            <div className={'Aside__Process'}>
                <CircleProcess percent={20}/>
            </div>
            <div className={'Aside__List'}>
                <div className={'text-left'}>
                    {
                        Array.from(listObject).map(level =>
                            <div key={level} className={"object mb-3"}>
                                <div className={'btn btn-primary'}>Bài {level}</div>
                                <ul>
                                    {
                                        (exercises.filter(quiz => quiz.levelId === level)).map(quiz =>
                                            <li className={'badge badge-secondary'} key={quiz.id}>{quiz.title}</li>)
                                    }
                                </ul>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ExerciseBar;