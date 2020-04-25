import React from 'react';
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import './scss/Aside.scss'
import EditorJavascript from "../components/lesson/EditorJavascript";
import Tool from "../components/lesson/Tool";
import LessonBar from "../components/aside/LessonBar";
import Hint from "../components/common/Hint";
import wrapperTool from "../components/hoc/wrapperTool";

const Lesson = () => {
    return (
        <Container fluid={true} className={'Content'}>
            <Row>
                <Col className={'Aside__Tool'} xs={3}>
                    <LessonBar/>
                </Col>
                <Col xs={3}/>
                <Col xs={6} className={'p-4'}>
                    <h4 className={'Title mb-4'}>Điền kết quả thực thi đoạn code sau :</h4>
                    <EditorJavascript/>
                    <div className={'Code__Result text-left mt-4'}>
                        <div className="alert alert-success" role="alert">
                            This is a success alert—check it out!
                        </div>
                        <div className="alert alert-danger" role="alert">
                            This is a danger alert—check it out!
                        </div>
                        <div className="alert alert-warning" role="alert">
                            This is a warning alert—check it out!
                        </div>
                    </div>
                    <form action="" className={'py-5'}>
                        <div className={'d-flex w-100 justify-content-between'}>
                            <input type="text" style={{flex: '0 0 68%'}}/>
                            <button className={'Button'} style={{flex: '0 0 30%'}}>Kiểm tra</button>
                        </div>
                    </form>
                    <div>
                        <Hint/>
                    </div>
                </Col>
                <Col xs={3} className={'p-4'}>
                    <Tool/>
                </Col>
            </Row>
        </Container>
    );
};

export default wrapperTool(Lesson);