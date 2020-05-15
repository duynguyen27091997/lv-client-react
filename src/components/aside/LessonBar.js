import React, {useEffect, useState} from 'react';
import CircleProcess from "../common/CircleProcess";
import {useSelector} from "react-redux";
import {Accordion} from 'react-bootstrap';

const LessonBar = ({current,changeQuiz}) => {
    const lessons = useSelector(state => state.course.lessons);
    const [listObject, setListObject] = useState([]);

    useEffect(_ => {
        let levels = new Set(lessons.map(item => item.levelId));
        setListObject(Array.from(levels).map(level =>{
            return {order:level,items:lessons.filter(quiz => quiz.levelId === level).sort((a, b) => a.sequenceNumber - b.sequenceNumber)}
        }));
    }, [changeQuiz, lessons])
    return (
        <div className={'Aside__Tab'}>
            <div className={'Aside__Process'}>
                <CircleProcess percent={30.5}/>
            </div>
            <div className={'Aside__List'}>
                <Accordion defaultActiveKey={1}>
                    <div className={'text-left'}>
                        {
                            Array.from(listObject).map(level =>
                                <div key={level.order} className={"object mb-3"}>
                                    <Accordion.Toggle as={'div'} eventKey={level.order}>
                                        <div className={'btn btn-primary'}>Bài {level.order}</div>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={level.order}>
                                        <ul>
                                            {
                                                (level.items).map(quiz =>
                                                    <li onClick={() => changeQuiz(quiz)}
                                                        className={'badge badge-secondary'}
                                                        key={quiz.id}>{quiz.title}</li>)
                                            }
                                        </ul>
                                    </Accordion.Collapse>
                                </div>)
                        }
                    </div>
                </Accordion>
            </div>
        </div>
    );
};

export default LessonBar;