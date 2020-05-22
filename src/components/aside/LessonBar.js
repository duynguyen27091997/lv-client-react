import React, {useEffect, useState} from 'react';
import CircleProcess from "../common/CircleProcess";
import {useSelector} from "react-redux";
import {Accordion} from 'react-bootstrap';
import swal from 'sweetalert';

const LessonBar = ({current, changeQuiz}) => {
    const lessons = useSelector(state => state.course.lessons);
    const [process, setProcess] = useState(0)
    const [key, setKey] = useState(0);
    const [listObject, setListObject] = useState([]);
    useEffect(_ => {
        if (current) {
            setKey(current.levelId)
        }
    }, [current])

    useEffect(_ => {
        let listQuizPass = lessons.filter(quiz => quiz.members.length);
        setProcess(Math.round(listQuizPass.length / lessons.length * 100) || 0)

        if (listQuizPass.length < lessons.length) {
            changeQuiz(lessons[listQuizPass.length])
        } else {
            if (current && lessons[lessons.length - 1].id !== current.id) {
                let index = lessons.findIndex(item => item.id === current.id);
                changeQuiz(lessons[index + 1])
            } else {
                changeQuiz(lessons[listQuizPass.length - 1])
            }

            if (lessons && current)
                if (lessons[lessons.length - 1].id === current.id) {
                    swal({
                        title: 'Bạn đã hoàn thành tất cả các câu hỏi',
                        icon: 'info',
                    }).then(r => r)
                }
        }
    }, [lessons])

    useEffect(_ => {
        let levels = new Set(lessons.map(item => item.levelId));
        setListObject(Array.from(levels).map(level => {
            return {
                order: level,
                items: lessons.filter(quiz => quiz.levelId === level).sort((a, b) => a.sequenceNumber - b.sequenceNumber)
            }
        }));
    }, [changeQuiz, lessons])

    const handleReject = () => {
        swal({
            title: 'Hoàn thành câu hỏi hiện tại để đến với câu tiếp theo',
            icon: 'error',
            timer: 1500,
            button: false
        }).then(r => r)
    }
    return (
        <div className={'Aside__Tab'}>
            <div className={'Aside__Process'}>
                <CircleProcess percent={process}/>
            </div>
            <div className={'Aside__List'}>
                {current && <Accordion activeKey={key}>
                    <div className={'text-left'}>
                        {
                            Array.from(listObject).map(level =>
                                <div key={level.order} className={"object mb-3"}>
                                    <Accordion.Toggle as={'div'} eventKey={level.order}>
                                        <div onClick={() => setKey(level.order)}
                                             className={'btn btn-primary'}>Bài {level.order}</div>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={level.order}>
                                        <ul>
                                            {
                                                (level.items).map(quiz => {
                                                        if (quiz.id === current.id) {
                                                            return <li onClick={() => changeQuiz(quiz)}
                                                                       className={'badge badge-info'}
                                                                       key={quiz.id}>{quiz.title}</li>
                                                        } else if (quiz.members.length)
                                                            return <li onClick={() => changeQuiz(quiz)}
                                                                       className={'badge badge-success'}
                                                                       key={quiz.id}>{quiz.title}</li>
                                                        else
                                                            return <li onClick={() => handleReject()}
                                                                       className={'badge badge-secondary'}
                                                                       key={quiz.id}>{quiz.title}</li>
                                                    }
                                                )
                                            }
                                        </ul>
                                    </Accordion.Collapse>
                                </div>)
                        }
                    </div>
                </Accordion>}
            </div>
        </div>
    );
};

export default LessonBar;