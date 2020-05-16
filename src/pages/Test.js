import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import './scss/Aside.scss'
import TestBar from "../components/aside/TestBar";
import wrapperTool from "../components/hoc/wrapperTool";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import swal from 'sweetalert';
import {AxiosBe} from "../utils/axios";

const Test = () => {
    const course = useSelector(state => state.course.course);
    const [assessment, setAssessment] = useState(null);
    const handleStart = () => {
        swal({
            title: 'Bắt đầu làm bài',
            icon: "info"
        }).then(r => {
            setAssessment(1)
        })
    }
    if (course)
        return (
            <Container fluid={true} className={'Content'}>
                <Row>
                    <Col className={'Aside__Tool'} xs={3}>
                        <TestBar startTest={handleStart}/>
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
                            <Col xs={9} className={'p-4'}>
                                <article>
                                </article>
                            </Col>

                    }

                </Row>
            </Container>
        );
    else
        return <Redirect to={'/'}/>
};

export default wrapperTool(Test);