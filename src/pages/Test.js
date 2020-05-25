import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button, Form, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import './scss/Aside.scss'
import TestBar from "../components/aside/TestBar";
import wrapperTool from "../components/hoc/wrapperTool";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import swal from 'sweetalert';
import {AxiosBe} from "../utils/axios";
import Editor from "../editor/Editor";
import {toTime} from "../helpers/helpers";

const Test = () => {
    const course = useSelector(state => state.course.course);
    const user = useSelector(state => state.main.user);
    const [assessment, setAssessment] = useState(null);
    const [test, setTest] = useState(null);
    const [expire, setExpire] = useState(false);
    const [assessmentAnswer, setAssessmentAnswer] = useState(null);

    const handleChangeCode = (item, code) => {
        if (assessmentAnswer) {
            const index = assessmentAnswer.findIndex(quiz => item.id === quiz.id);
            assessmentAnswer[index].code = code
        }
    };
    const handleChangeAnswer = (item, answer) => {

        if (assessmentAnswer) {
            const index = assessmentAnswer.findIndex(quiz => item.id === quiz.id);
            assessmentAnswer[index].answer = answer;
        }
    };
    const handleStart = () => {
        swal({
            title: "Bắt đầu làm bài ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(r => {
            if (r)
                AxiosBe.get(`/api/assessment?courseId=${course.id}&userId=${user.id}`)
                    .then(({data: res}) => {
                        if (res.success) {
                            setAssessment(res.data)
                            setTest({...res.assessment, total: res.assessment.duration});
                            setAssessmentAnswer(res.data.map(item => {
                                return {
                                    id: item.id,
                                    kindChallengeId: item.kindChallengeId,
                                    code: item.code,
                                    answer: ''
                                }
                            }))
                            window.scrollTo(0, 0);
                        } else {
                            swal({
                                title: "Hiện tại chưa có đề thi nào !",
                                icon: "error",
                                buttons: false,
                                timer: 1500
                            }).then(r => r)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
        })
    }
    const handleSubmit = () => {
        if (test.total - test.duration)
            swal({
                title: "Nộp bài ?",
                icon: "info",
                buttons: true,
                dangerMode: true,
            }).then(r => {
                if (r) {
                    setExpire(true);
                    console.table({
                        userId: user.id,
                        assessmentId: test.id,
                        courseId: course.id,
                        time: test.total - test.duration,
                        data: assessmentAnswer
                    })
                }
            })
        else{
            swal({
                title: "Đã hết giờ làm bài",
                icon: "info",
                buttons: false,
                timer:1500
            }).then(r => r)
            setExpire(true);
            console.table({
                userId: user.id,
                assessmentId: test.id,
                courseId: course.id,
                time: test.total - test.duration,
                data: assessmentAnswer
            })
        }
    }

    useEffect(_ => {
        if (test) {
            if (!expire)
                if (test.duration !== 0)
                    setTimeout(_ => {
                        setTest({...test, duration: test.duration - 1})
                    }, 1000)
                else {
                    handleSubmit()
                }
        }
        // eslint-disable-next-line
    }, [test, expire])

    if (course)
        return (
            <Container fluid={true} className={'Content'}>
                <Row>
                    <Col className={'Aside__Tool'} xs={3}>
                        <TestBar startTest={handleStart} assessment={assessment}/>
                    </Col>
                    <Col xs={3}/>
                    {
                        !assessment ?
                            <Col xs={9} className={'p-4'}>
                                <h4 className={'Title text-left my-4'}>Bài Kiểm Tra</h4>
                                <p>Bài kiểm tra là bước cuối cùng trước khi bạn kết thúc quá trình rèn luyện trên nền
                                    tảng này.
                                    Bài kiểm tra bao gồm một số câu hỏi được thiết kế để đánh giá kết quả học tập của
                                    bạn..</p>
                                <p>Đừng quá lo lắng, bởi vì điểm số ở đây không được sử dụng chính thức để đánh giá quá
                                    trình
                                    học của bạn, mà nó chỉ được sử dụng để phản ánh trình độ của bạn sau khi đã hoàn
                                    thành các
                                    bài học và phần rèn luyện trên nền tảng này. Ngoài ra, bạn không bị hạn chế số lần
                                    làm bài
                                    kiểm tra. Hãy làm lại nếu bạn đạt điểm số quá thấp..</p>
                                <p>Hãy bắt đầu nào!!</p>
                            </Col>
                            :
                            <Col xs={6} className={'p-4'}>
                                {assessment.length ?
                                    <div>
                                        <section>
                                            {assessment.map((item, index) => {
                                                if (item.kindChallengeId === 1)
                                                    return <div className={'mb-5'} key={item.id}>
                                                        <h6 className={'title mb-2'}>Câu {index + 1}</h6>
                                                        <h5>{item.title} (điền đáp án)</h5>
                                                        <h6>{item.question}</h6>
                                                        <Editor readOnly={true} code={item.code}
                                                                type={course['LanguageChallenges'][0]['title']}
                                                                change={(code) => {
                                                                }}/>
                                                        <Form.Control
                                                            onChange={(e) => handleChangeAnswer(item, e.target.value)}
                                                            className={"mt-2"} type="text"
                                                            placeholder="Nhập đáp án ..."/>
                                                    </div>
                                                else
                                                    return <div className={'mb-5'} key={item.id}>
                                                        <h6 className={'title mb-2'}>Câu {index + 1}</h6>
                                                        <h5>{item.title} (viết code)</h5>
                                                        <h6>{item.question}</h6>
                                                        <Editor code={item.code}
                                                                type={course['LanguageChallenges'][0]['title']}
                                                                change={(code) => {
                                                                    handleChangeCode(item, code)
                                                                }}/>
                                                    </div>
                                            })}
                                            <hr/>
                                        </section>
                                        <Button className={"mt-5"} onClick={handleSubmit} block={true}>Nộp bài</Button>
                                    </div>
                                    :
                                    <div className={'mb-5'}>
                                        <h4 className={'text-muted'}>Hiện chưa có câu hỏi nào !</h4>
                                    </div>
                                }
                            </Col>

                    }
                    {/* <Modal show={true} dialogClassName="modal-300w">*/}
                    {/*    <Modal.Header closeButton>*/}
                    {/*        <Modal.Title>*/}
                    {/*            <h1 className={'title mb-0'}>Kết quả</h1>*/}
                    {/*        </Modal.Title>*/}
                    {/*    </Modal.Header>*/}
                    {/*    <Modal.Body>*/}
                    {/*        <div className={"d-flex flex-column"} style={{width:'200px',margin:'0 auto'}}>*/}
                    {/*            <div className="btn btn-success mb-2">Câu 1</div>*/}
                    {/*            <div className="btn btn-success mb-2">Câu 2</div>*/}
                    {/*            <div className="btn btn-danger mb-2">Câu 3</div>*/}
                    {/*            <div className="btn btn-success mb-2">Câu 4</div>*/}
                    {/*            <div className="btn btn-danger mb-2">Câu 5</div>*/}
                    {/*            <div className="btn btn-success mb-2">Câu 6</div>*/}
                    {/*            <div className="btn btn-success mb-2">Câu 7</div>*/}
                    {/*            <div className="btn btn-success mb-2">Câu 8</div>*/}
                    {/*            <div className="btn btn-danger mb-2">Câu 9</div>*/}
                    {/*            <div className="btn btn-success mb-2">Câu 10</div>*/}
                    {/*        </div>*/}
                    {/*        <div className={"mt-5"}>*/}
                    {/*            <div className="btn btn-info mb-2 w-100" >Xác Nhận</div>*/}
                    {/*        </div>*/}
                    {/*    </Modal.Body>*/}
                    {/*</Modal>*/}
                </Row>
                {
                    test &&
                    <div className={'test__bottom'}>
                        <Row>
                            <Col>
                                <div className={'d-flex justify-content-center align-items-center'}
                                     style={{height: 50}}>
                                    <span className={"mr-3"}>Thời gian còn lại : </span>
                                    <div className={'test__bar'}>
                                        <span className={'test__bar__process'}
                                              style={{width: (test.duration / test.total) * 100 + '%'}}/>
                                    </div>
                                    <span className={"ml-3"}>{toTime(test.duration)}</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                }
            </Container>
        );
    else
        return <Redirect to={'/'}/>
};

export default wrapperTool(Test);