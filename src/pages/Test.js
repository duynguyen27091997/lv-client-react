import React from 'react';
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import './scss/Aside.scss'
import TestBar from "../components/aside/TestBar";
import wrapperTool from "../components/hoc/wrapperTool";

const Test = () => {
    return (
        <Container fluid={true} className={'Content'}>
            <Row>
                <Col className={'Aside__Tool'} xs={3}>
                    <TestBar/>
                </Col>
                <Col xs={3}/>
                <Col xs={9} className={'p-4'}>
                    <h4 className={'Title text-left my-4'}>Bài Kiểm Tra</h4>
                    <p>Bài kiểm tra là bước cuối cùng trước khi bạn kết thúc quá trình rèn luyện trên nền tảng này. Bài kiểm tra bao gồm một số câu hỏi được thiết kế để đánh giá kết quả học tập của bạn..</p>
                    <p>Đừng quá lo lắng, bởi vì điểm số ở đây không được sử dụng chính thức để đánh giá quá trình học của bạn, mà nó chỉ được sử dụng để phản ánh trình độ của bạn sau khi đã hoàn thành các bài học và phần rèn luyện trên nền tảng này. Ngoài ra, bạn không bị hạn chế số lần làm bài kiểm tra. Hãy làm lại nếu bạn đạt điểm số quá thấp..</p>
                    <p>Hãy bắt đầu nào!!</p>
                </Col>
            </Row>
        </Container>
    );
};

export default wrapperTool(Test);