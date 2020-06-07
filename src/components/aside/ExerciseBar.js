import React, {useEffect, useState} from 'react';
import CircleProcess from "../common/CircleProcess";
import {useSelector} from "react-redux";
import {Accordion} from "react-bootstrap";

const ExerciseBar = ({current,changeQuiz}) => {
    const exercises = useSelector(state => state.course.exercises);
    const [process,setProcess] = useState(0)
    const [key, setKey] = useState(0);
    const [listObject, setListObject] = useState([]);
    useEffect(_ => {
        if (current) {
            setKey(current.levelId)
        }
    }, [current])

    useEffect(_ => {
        let listQuizPass = exercises.filter(quiz => quiz.members.length);
        setProcess(Math.round(listQuizPass.length / exercises.length * 100) || 0)

        if (listQuizPass.length < exercises.length) {
            let index = exercises.findIndex(quiz=> !quiz.members.length);
            if (index !== -1) {
                changeQuiz(exercises[index])
            } else {
                changeQuiz(exercises[exercises.length - 1])
            }
        } else {
            if (current && exercises[exercises.length - 1].id !== current.id) {
                let index = exercises.findIndex(item => item.id === current.id);
                changeQuiz(exercises[index + 1])
            } else {
                changeQuiz(exercises[listQuizPass.length - 1])
            }
        }
        // eslint-disable-next-line
    }, [exercises])

    useEffect(_ => {
        let levels = new Set(exercises.map(item => item.levelId));
        setListObject(Array.from(levels).map(level => {
            return {
                order: level,
                items: exercises.filter(quiz => quiz.levelId === level).sort((a, b) => a.sequenceNumber - b.sequenceNumber)
            }
        }));
    }, [changeQuiz, exercises])

    return (
        <div className={'Aside__Tab'}>
            <div className={'Aside__Process'}>
                <CircleProcess percent={process}/>
            </div>
            <div className={'Aside__List'}>
                {current && <Accordion activeKey={key}>
                    <div className={'text-left'}>
                        {
                            exercises.map(quiz =>
                            {
                                if (quiz.id === current.id) {
                                    return <li onClick={() => changeQuiz(quiz)}
                                               className={'exercise d-block badge badge-info'}
                                               key={quiz.id}>{quiz.title} <i className="las la-play"/></li>
                                } else if (quiz.members.length)
                                    return <li onClick={() => changeQuiz(quiz)}
                                               className={'exercise d-block badge badge-success'}
                                               key={quiz.id}>{quiz.title} <i className="las la-check"/></li>
                                else
                                    return <li onClick={() => changeQuiz(quiz)}
                                               className={'exercise d-block badge badge-secondary'}
                                               key={quiz.id}>{quiz.title}</li>
                            })
                        }
                        {/*{*/}
                        {/*    Array.from(listObject).map(level =>*/}
                        {/*        <div key={level.order} className={"object object-exercise mb-3"}>*/}
                        {/*            <Accordion.Toggle as={'div'} eventKey={level.order}>*/}
                        {/*                <div onClick={_=>setKey(level.order)} className={'btn btn-primary'}>Bài {level.order}</div>*/}
                        {/*            </Accordion.Toggle>*/}
                        {/*            <Accordion.Collapse eventKey={level.order}>*/}
                        {/*                <ul>*/}
                        {/*                    {*/}
                        {/*                        level.items.map(quiz =>*/}
                        {/*                        {*/}
                        {/*                            if (quiz.id === current.id) {*/}
                        {/*                                return <li onClick={() => changeQuiz(quiz)}*/}
                        {/*                                           className={'badge badge-info'}*/}
                        {/*                                           key={quiz.id}>{quiz.title} <i className="las la-play"/></li>*/}
                        {/*                            } else if (quiz.members.length)*/}
                        {/*                                return <li onClick={() => changeQuiz(quiz)}*/}
                        {/*                                           className={'badge badge-success'}*/}
                        {/*                                           key={quiz.id}>{quiz.title} <i className="las la-check"/></li>*/}
                        {/*                            else*/}
                        {/*                                return <li onClick={() => changeQuiz(quiz)}*/}
                        {/*                                           className={'badge badge-secondary'}*/}
                        {/*                                           key={quiz.id}>{quiz.title}</li>*/}
                        {/*                        })*/}
                        {/*                    }*/}
                        {/*                </ul>*/}
                        {/*            </Accordion.Collapse>*/}
                        {/*        </div>)*/}
                        {/*}*/}
                    </div>
                </Accordion>}
            </div>
        </div>
    );
};

export default ExerciseBar;