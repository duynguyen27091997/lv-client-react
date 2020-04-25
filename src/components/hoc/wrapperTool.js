import React, {Fragment} from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const WrapperTool = (WrapperComponent) => {
    return (props) => (
        <Fragment>
            <Container fluid={true} className={'Aside__Menu'}>
                    <Row>
                        <Col xs={3} style={{padding:0}}>
                            <Nav>
                                <Nav.Item>
                                    <NavLink className={'nav-link'} exact to={'/lesson'}>Bài học</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink className={'nav-link'} exact to={'/exercise'}>Luyện tập</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink className={'nav-link'} exact to={'/test'}>Kiểm tra</NavLink>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
            </Container>
            <WrapperComponent {...props}/>
        </Fragment>
    );
};

export default WrapperTool;