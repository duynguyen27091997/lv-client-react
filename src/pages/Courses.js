import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CardCourse from "../components/article/CardCourse";

class Courses extends Component {
    render() {
        return (
            <Container className={'Content'} >
                <Row style={{marginTop:'150px'}}>
                    <Col xs={4}>
                        <CardCourse/>
                    </Col>
                    <Col xs={4}>
                        <CardCourse/>
                    </Col>
                    <Col xs={4}>
                        <CardCourse/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Courses;