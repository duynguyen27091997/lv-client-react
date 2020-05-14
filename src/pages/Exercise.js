import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import './scss/Aside.scss'
import Tool from "../components/lesson/Tool";
import ExerciseBar from "../components/aside/ExerciseBar";
import Hint from "../components/common/Hint";
import wrapperTool from "../components/hoc/wrapperTool";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import Editor from "../editor/Editor";
import {AxiosBe} from "../utils/axios";
import {setExercises} from "../actions/courseActions";

const Exercise = () => {
    const course = useSelector(state => state.course.course);
    const exercises = useSelector(state => state.course.exercises);
    const dispatch = useDispatch();
    const [quiz,setQuiz] = useState(null);

    useEffect(_ => {
        if (course && !exercises)
            AxiosBe.get(`/api/coding?courseId=${course.id}`)
                .then(({data:res}) => {
                    dispatch(setExercises(res.data))
                })
                .catch(err => {
                    dispatch(setExercises([]))
                })
    }, [course, dispatch, exercises])
    const changeCode = (code)=>{
        console.log(code)
    }
    if (course) {
        return (
            <Container fluid={true} className={'Content'}>
                {
                    exercises ?
                        <Row>
                            <Col className={'Aside__Tool'} xs={3}>
                                <ExerciseBar changeQuiz={(quiz)=>setQuiz(quiz)}/>
                            </Col>
                            <Col xs={3}/>
                            <Col xs={6} className={'p-4'}>
                                {
                                    quiz ?
                                        <section>
                                            <h4 className={'Title mb-4'}>{quiz.question}</h4>
                                            <Editor type={course['LanguageChallenges'][0]['title']} change={(code) =>changeCode(code)}/>
                                            {/*<div className={'Code__Result text-left mt-4'}>*/}
                                            {/*    <div className="alert alert-success" role="alert">*/}
                                            {/*        This is a success alert—check it out!*/}
                                            {/*    </div>*/}
                                            {/*    <div className="alert alert-danger" role="alert">*/}
                                            {/*        This is a danger alert—check it out!*/}
                                            {/*    </div>*/}
                                            {/*    <div className="alert alert-warning" role="alert">*/}
                                            {/*        This is a warning alert—check it out!*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            <form action="" className={'py-5'}>
                                                <div className={'d-flex w-100 justify-content-between'}>
                                                    <input type="text" style={{flex: '0 0 68%'}}/>
                                                    <button className={'Button'} style={{flex: '0 0 30%'}}>Kiểm tra</button>
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

export default wrapperTool(Exercise);