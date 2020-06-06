import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import './scss/Aside.scss'
import Editor from "../editor/Editor";
import Tool from "../components/common/Tool";
import LessonBar from "../components/aside/LessonBar";
import Hint from "../components/common/Hint";
import {Redirect} from "react-router-dom";
import wrapperTool from "../components/hoc/wrapperTool";
import {useDispatch, useSelector} from "react-redux";
import {AxiosBe} from "../utils/axios";
import { setLessons} from "../actions/courseActions";
import swal from "sweetalert";
import qs from 'querystring';
import PageLoading from "../components/common/PageLoading";

const Lesson = () => {

    const user = useSelector(state => state.main.user);
    const course = useSelector(state => state.course.course);
    const lessons = useSelector(state => state.course.lessons);

    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState('')
    const [quiz, setQuiz] = useState(null);

    const dispatch = useDispatch();

    useEffect(_ => {
        if (course && !lessons)
            AxiosBe.get(`/api/lesson?courseId=${course.id}&userId=${user.id}`)
                .then(({data: res}) => {
                    const lessons = res.data.sort((a, b) => {
                        if (a.levelId === b.levelId){
                           return a.sequenceNumber - b.sequenceNumber
                        }
                        return a.levelId - b.levelId
                    })
                    dispatch(setLessons(lessons))
                })
                .catch(err => {
                    dispatch(setLessons([]))
                })
    }, [course, dispatch, lessons, user.id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!answer) {
            swal({
                title: "Đáp án không được để trống",
                icon: 'error',
                timer: 1500,
                button: false
            }).then(r => r)
        } else {
            setLoading(true);
            let payload = {
                id: quiz.id,
                result: answer,
                code: code,
                keyName: 2,
                doTime: 1
            }
            AxiosBe.post(`/api/submit/${user.id}`, qs.stringify(payload))
                .then(({data: res}) => {
                    if (res.success) {
                        setAnswer('');
                        swal({
                            title: res.message,
                            icon: 'success',
                            timer: 1500,
                            button: false
                        }).then(r => r)
                        AxiosBe.get(`/api/lesson?courseId=${course.id}&userId=${user.id}`)
                            .then(({data: res}) => {
                                const lessons = res.data.sort((a, b) => {
                                    if (a.levelId === b.levelId){
                                        return a.sequenceNumber - b.sequenceNumber
                                    }
                                    return a.levelId - b.levelId
                                })
                                dispatch(setLessons(lessons))
                            })
                            .catch(err => {
                                dispatch(setLessons([]))
                            })
                    } else {
                        swal({
                            title: res.message,
                            icon: 'error',
                            timer: 1500,
                            button: false
                        }).then(r => r)
                    }
                })
                .catch(err => {
                    console.log(err)
                    swal({
                        title: "Có lỗi xảy ra  trong quá trình xử lí",
                        icon: 'error',
                        timer: 1500,
                        button: false
                    }).then(r => r)
                })
                .finally(_=>{
                    setLoading(false)
                })
        }
    }

    if (course) {
        return (
            <Container fluid={true} className={'Content'}>
                {loading && <PageLoading/>}
                {
                    lessons ?
                        <Row>
                            <Col className={'Aside__Tool'} xs={3}>
                                <LessonBar current={quiz} changeQuiz={(quiz) => setQuiz(quiz)}/>
                            </Col>
                            <Col xs={3}/>
                            <Col xs={6} className={'p-4'}>
                                {
                                    quiz ?
                                        <section>
                                            <h4 className={'Title '}>{quiz.title}</h4>
                                            <h5 className={'mb-4'}>{quiz.question}</h5>
                                            <Editor readOnly={true} code={quiz.code}
                                                    type={course['LanguageChallenges'][0]['title']}
                                                    change={(code) => setCode(code)}/>

                                            <div className={'py-5'}>
                                                <div className={'d-flex w-100 justify-content-between'}>
                                                    <input value={answer} onChange={(e) => setAnswer(e.target.value)}
                                                           type="text" style={{flex: '0 0 68%'}}/>
                                                    <button onClick={handleSubmit} className={'Button'}
                                                            style={{flex: '0 0 30%'}}>Kiểm tra
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    quiz.tutorial && <Hint tutorial={quiz.tutorial}/>
                                                }
                                            </div>
                                        </section>
                                        :
                                        null
                                }
                            </Col>
                            <Col xs={3} className={'p-4'}>
                                <Tool/>
                            </Col>
                        </Row>
                        :
                        null
                }
            </Container>
        );

    } else
        return <Redirect to={'/'}/>
};

export default wrapperTool(Lesson);