import React from 'react';
import {Card} from "react-bootstrap";
import './CardCourse.scss'
import {Link} from "react-router-dom";

const CardCourse = () => {
    return (
        <Card className={'CardCourse'}>
            <Link to={'/lesson'}>
                <Card.Img className={'CardCourse__img'} variant="top" src="https://picsum.photos/200/300"/>
                <Card.Body>
                    <Card.Title style={{color:'#000'}}>Javascript</Card.Title>
                </Card.Body>
            </Link>
        </Card>
    );
};

export default CardCourse;