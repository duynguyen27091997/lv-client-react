import React, {useEffect, useState} from 'react';
import CircleProcess from "../common/CircleProcess";
import {useSelector} from "react-redux";

const LessonBar = ({changeQuiz}) => {
    const lessons = useSelector(state=>state.course.lessons);
    const [listObject, setListObject] = useState([]);

    useEffect(_=>{
        setListObject(new Set(lessons.map(item => item.levelId)))
        changeQuiz(lessons[0])
    },[changeQuiz, lessons])
    return (
        <div className={'Aside__Tab'}>
            <div className={'Aside__Process'}>
                <CircleProcess percent={30.5}/>
            </div>
            <div className={'Aside__List'}>
                <div className={'text-left'}>
                    {
                        Array.from(listObject).map(level =>
                            <div key={level} className={"object mb-3"}>
                                <div className={'btn btn-primary'}>Bài {level}</div>
                                <ul>
                                {
                                    (lessons.filter(quiz => quiz.levelId === level)).map(quiz =>
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

export default LessonBar;