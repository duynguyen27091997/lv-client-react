import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import './ArticleIntro.scss'
class ArticleIntro extends Component{
    render() {
        return (
            <Card className={'ArticleIntro'} onClick={this.props.onClick}>
                <Card.Img variant="top" src={this.props.article.img} />
                <Card.Body>
                    <Card.Title>{this.props.article.title}</Card.Title>
                    <Card.Text>
                        {this.props.article.content}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
export default ArticleIntro
