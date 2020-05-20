import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button, Form, Modal, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import './scss/Aside.scss'
import TestBar from "../components/aside/TestBar";
import wrapperTool from "../components/hoc/wrapperTool";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import swal from 'sweetalert';
import {AxiosBe} from "../utils/axios";
import Editor from "../editor/Editor";

const Test = () => {
    const course = useSelector(state => state.course.course);
    const user = useSelector(state => state.main.user);
    const [assessment, setAssessment] = useState(null);
    const handleStart = () => {
        swal({
            title: "Bắt đầu làm bài ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(r => {
            AxiosBe.get(`/api/assessment?courseId=${course.id}&userId=${user.id}`)
                .then(({data:res})=>{
                    if (res.success){
                        setAssessment(res.data)
                    }else{
                        swal({
                            title: "Hiện tại chưa có đề thi nào !",
                            icon: "error",
                            buttons: false,
                            timer:1500
                        }).then(r => r)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    }
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
                                <section>
                                    {assessment.map((item,index) =>{
                                        return <div className={'mt-4'} key={item.id}>
                                            <h6 className={'title'}>Câu {index+1}</h6>
                                            <Editor code={item.code} type={course['LanguageChallenges'][0]['title']} change={(code) =>{}}/>
                                            <Form.Control className={"mt-2"} type="text" placeholder="Nhập đáp án ..." />
                                        </div>
                                    })}
                                </section>
                                <Button className={"mt-5"} block={true}>Nộp bài</Button>
                            </Col>

                    }
                   {/* <Modal show={true} dialogClassName="modal-300w">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h1 className={'title mb-0'}>Kết quả</h1>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={"d-flex flex-column"} style={{width:'200px',margin:'0 auto'}}>
                                <div className="btn btn-success mb-2">Câu 1</div>
                                <div className="btn btn-success mb-2">Câu 2</div>
                                <div className="btn btn-danger mb-2">Câu 3</div>
                                <div className="btn btn-success mb-2">Câu 4</div>
                                <div className="btn btn-danger mb-2">Câu 5</div>
                                <div className="btn btn-success mb-2">Câu 6</div>
                                <div className="btn btn-success mb-2">Câu 7</div>
                                <div className="btn btn-success mb-2">Câu 8</div>
                                <div className="btn btn-danger mb-2">Câu 9</div>
                                <div className="btn btn-success mb-2">Câu 10</div>
                            </div>
                            <div className={"mt-5"}>
                                <div className="btn btn-info mb-2 w-100" >Xác Nhận</div>
                            </div>
                        </Modal.Body>
                    </Modal>*/}
                </Row>
            </Container>
        );
    else
        return <Redirect to={'/'}/>
};

export default wrapperTool(Test);