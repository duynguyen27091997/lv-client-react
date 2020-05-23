import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CardCourse from "../components/article/CardCourse";
import {AxiosBe} from "../utils/axios";


const Courses = () => {
    const [list, setList] = useState([]);
    useEffect(_ => {
        window.scrollTo(0,0);
        AxiosBe.get('/api/courses')
            .then(({data: res}) => {
                setList(res.data)
            })
            .catch(err => {
                setList([])
            })
    },[])
    return (<Container className={'Content'}>
        <Row style={{marginTop: '150px'}}>
            {
                list.map(course =><Col key={course.id} xs={4}>
                    <CardCourse course={course}/>
                </Col> )
            }
        </Row>
    </Container>);
};

export default Courses;