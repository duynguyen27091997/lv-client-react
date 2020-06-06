import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import './scss/Aside.scss'
import ExerciseBar from "../components/aside/ExerciseBar";
import Hint from "../components/common/Hint";
import wrapperTool from "../components/hoc/wrapperTool";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import Editor from "../editor/Editor";
import {AxiosBe} from "../utils/axios";
import {setExercises} from "../actions/courseActions";
import ResultCoding from "../components/common/ResultCoding";
import swal from "sweetalert";
import qs from "querystring";
import PageLoading from "../components/common/PageLoading";

const Exercise = () => {
    const user = useSelector(state => state.main.user);
    const course = useSelector(state => state.course.course);
    const exercises = useSelector(state => state.course.exercises);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState('')
    const [err, setErr] = useState('')
    const [quiz, setQuiz] = useState(null);
    useEffect(_ => {
        setErr('')
    }, [quiz]);
    useEffect(_ => {
        if (course && !exercises)
            AxiosBe.get(`/api/coding?courseId=${course.id}&userId=${user.id}`)
                .then(({data: res}) => {
                    const exercises = res.data.sort((a, b) => {
                        if (a.levelId === b.levelId) {
                            return a.sequenceNumber - b.sequenceNumber
                        }
                        return a.levelId - b.levelId
                    })
                    dispatch(setExercises(exercises))
                })
                .catch(err => {
                    dispatch(setExercises([]))
                })
    }, [course, dispatch, exercises, user.id])

    const handleSubmit = (e) => {
        setErr('');
        e.preventDefault();
        if (!code) {
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
                code: code,
                result: '',
                keyName: 1,
                doTime: 1
            }
            AxiosBe.post(`/api/submit/${user.id}`, qs.stringify(payload))
                .then(({data: res}) => {
                    if (res.success) {
                        swal({
                            title: res.message,
                            icon: 'success',
                            timer: 1500,
                            button: false
                        }).then(r => r)
                        AxiosBe.get(`/api/coding?courseId=${course.id}&userId=${user.id}`)
                            .then(({data: res}) => {
                                const lessons = res.data.sort((a, b) => {
                                    if (a.levelId === b.levelId) {
                                        return a.sequenceNumber - b.sequenceNumber
                                    }
                                    return a.levelId - b.levelId
                                })
                                dispatch(setExercises(lessons))
                            })
                            .catch(err => {
                                dispatch(setExercises([]))
                            })
                            .finally(_ => {
                                setLoading(false);
                            })
                    } else {
                        setLoading(false)
                        if (res.dataErr) {
                            setErr(res.dataErr)
                        } else
                            swal({
                                title: res.message,
                                icon: 'error',
                                timer: 1500,
                                button: false
                            }).then(r => r)
                    }
                })
                .catch(err => {
                    setLoading(false)
                    swal({
                        title: "Có lỗi xảy ra  trong quá trình xử lí",
                        icon: 'error',
                        timer: 1500,
                        button: false
                    }).then(r => r)
                })
        }
    }

    if (course) {
        return (
            <Container fluid={true} className={'Content'}>
                {loading && <PageLoading/>}
                {
                    exercises ?
                        <Row>
                            <Col className={'Aside__Tool'} xs={3}>
                                <ExerciseBar current={quiz} changeQuiz={(quiz) => setQuiz(quiz)}/>
                            </Col>
                            <Col xs={3}/>
                            <Col xs={6} className={'p-4'}>
                                {
                                    quiz ?
                                        <section>
                                            <h4 className={'Title '}>{quiz.title}</h4>
                                            <h5 className={'mb-4'}>{quiz.question}</h5>
                                            {
                                                quiz.members.length ?
                                                    <Editor readOnly={false}
                                                            code={quiz.members[0]['QuizResult']['code']}
                                                            type={course['LanguageChallenges'][0]['title']}
                                                            change={(code) => setCode(code)}/>
                                                    :
                                                    <Editor readOnly={false} code={quiz.code}
                                                            type={course['LanguageChallenges'][0]['title']}
                                                            change={(code) => setCode(code)}/>
                                            }

                                            <form action="" className={'py-5'}>
                                                <div className={'d-flex w-100'}>
                                                    <button onClick={handleSubmit} className={'Button w-100'}>Kiểm tra
                                                    </button>
                                                </div>
                                            </form>
                                            <div>
                                                <Hint tutorial={quiz.tutorial}/>
                                            </div>
                                        </section>
                                        :
                                        null
                                }
                            </Col>
                            <Col xs={3} className={'p-4'}>
                                {err ? <ResultCoding err={err}/> : null}
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

export default wrapperTool(Exercise);