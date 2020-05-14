import React from 'react';
import {Card} from "react-bootstrap";
import './CardCourse.scss'
import php from '../../assets/img/language/php.png';
import javascript from '../../assets/img/language/javascript.png';
import java from '../../assets/img/language/java.png';
import pascal from '../../assets/img/language/pascal.png';
import c from '../../assets/img/language/c.png';
import cPlus from '../../assets/img/language/c++.png';
import {useDispatch} from "react-redux";
import {setCourse} from "../../actions/courseActions";
import {withRouter} from "react-router-dom" ;
const CardCourse = ({course,history}) => {
    const dispatch = useDispatch();
    const listImage = {
        php:php,
        javascript:javascript,
        java:java,
        c:c,
        pascal:pascal,
        'c++':cPlus
    }

    const enterCourse = ()=>{
        dispatch(setCourse(course))
        history.push('/lesson')
    }
    return (
        <Card onClick={enterCourse} className={'CardCourse'}>
                <Card.Img className={'CardCourse__img'} variant="top"  src={listImage[course['LanguageChallenges'][0]['title']]}/>
                <Card.Body>
                    <Card.Title style={{color:'#000'}}>{course.name}</Card.Title>
                </Card.Body>
        </Card>
    );
};

export default withRouter(CardCourse);