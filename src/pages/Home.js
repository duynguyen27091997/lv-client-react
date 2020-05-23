import React, {useEffect, useState} from 'react';
import './scss/Home.scss';
import {Col, Container, Row} from "react-bootstrap";
import ArticleIntro from "../components/home/ArticleIntro";
import Banner from '../assets/img/Banner.jpg';
import imgBaiHoc from '../assets/img/home/book.png';
import imgLuyenTap from '../assets/img/home/practice.png';
import imgKiemTra from '../assets/img/home/coding.png';
import imgMienPhi from '../assets/img/home/computer.png';
import {AxiosBe} from "../utils/axios";
import CountUp from "react-countup";

const Home = (props) => {
    const [counts, setCounts] = useState([]);
    useEffect(_ => {
        if (!counts.length)
            AxiosBe.get('/api/home')
                .then(({data: res}) => {
                    setCounts(res.data);
                }).catch(err => {
                console.log(err)
            })
    }, [counts.length]);
    const list = [
        {
            img: imgBaiHoc,
            title: 'Bài học',
            content: 'Chuỗi các bài học được chia làm 11 mức độ nối tiếp nhau, giúp cho người học đi từ những khái niệm cơ bản nhất cho đến những bài toán giải quyết vấn đề.'
        },
        {
            img: imgLuyenTap,
            title: 'Luyện tập',
            content: 'Chuỗi các bài luyện tập giúp học viên thực hành kỹ năng giải quyết vấn đề và áp dụng các thuật toán thông dụng trong những bài toán thường gặp.'
        },
        {
            img: imgKiemTra,
            title: 'Bài kiểm tra',
            content: 'Bài kiểm tra ngắn là bước cuối cùng để học viên hoàn thành các nội dung luyện tập, giúp học viên biết được tình trạng của mình sau một thời gian luyện tập.'
        },
        {
            img: imgMienPhi,
            title: 'Miễn phí',
            content: 'Nền tảng Small Code được cung cấp hoàn toàn miễn phí nhằm tạo điều kiện tốt nhất cho tất cả mọi người có cơ hội tiếp cận và luyện tập bất cứ lúc nào.'
        },

    ];

    return (
        <div className={'Home'}>
            <div className={'Home__Banner'}>
                <div className={'Home__Banner-content'}>
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <h1>Chào mừng đến với Small Code!</h1>
                                <h5>
                                    Small Code là một nền tảng hỗ trợ các lập trình viên học, luyện tập thuật toán và kỹ
                                    năng giải quyết vấn đề. Các bài luyện tập trong Small Code được thiết kế để dẫn dắt
                                    và nâng kỹ năng của lập trình viên theo từng cấp độ.

                                    Nền tảng Small Code được cung cấp hoàn toàn miễn phí.
                                </h5>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <img className={'Home__Banner-img'} src={Banner} alt=""/>
            </div>
            <div>
                <Container>
                    <Row>
                        {
                            counts.length ? counts.map((count, index) => <Col className={"my-5"} key={index}>
                                <div className={'count-up'}>
                                    <h2><CountUp delay={0.5} end={count.count} duration={5}/></h2>
                                    <h5>{count.title}</h5>
                                </div>
                            </Col>)
                                : null
                        }
                    </Row>
                </Container>
            </div>
            <div className={'Home__Info my-5'}>
                <Container>
                    <Row>
                        <div className={'card-deck'}>
                            {
                                list.slice(0, 2).map((article, index) => {
                                    return <Col key={index}><ArticleIntro article={article} /></Col>
                                })
                            }
                        </div>
                    </Row>
                    <Row>
                        <div className={'card-deck'}>
                            {
                                list.slice(2, 4).map((article, index) => {
                                    return <Col key={index}><ArticleIntro article={article} /></Col>
                                })
                            }
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Home