import React, {Component} from 'react';
import './scss/Home.scss';
import {Col, Container, Row} from "react-bootstrap";
import ArticleIntro from "../components/home/ArticleIntro";
import Banner from '../assets/img/Banner.jpg';
import imgBaiHoc from '../assets/img/home/Bai_hoc.png';
import imgLuyenTap from '../assets/img/home/Luyen_tap.png';
import imgKiemTra from '../assets/img/home/Kiem_tra.png';
import imgMienPhi from '../assets/img/home/Mien_phi.png';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            list:[
                {
                    img: imgBaiHoc,
                    title:'Bài học',
                    content:'Chuỗi các bài học được chia làm 11 mức độ nối tiếp nhau, giúp cho người học đi từ những khái niệm cơ bản nhất cho đến những bài toán giải quyết vấn đề.'
                },
                {
                    img:imgLuyenTap,
                    title:'Luyện tập',
                    content:'Chuỗi các bài luyện tập giúp học viên thực hành kỹ năng giải quyết vấn đề và áp dụng các thuật toán thông dụng trong những bài toán thường gặp.'
                },
                {
                    img:imgKiemTra,
                    title:'Bài kiểm tra',
                    content:'Bài kiểm tra ngắn là bước cuối cùng để học viên hoàn thành các nội dung luyện tập, giúp học viên biết được tình trạng của mình sau một thời gian luyện tập.'
                },
                {
                    img:imgMienPhi,
                    title:'Miễn phí',
                    content:'Nền tảng CodeGym Bob được cung cấp hoàn toàn miễn phí nhằm tạo điều kiện tốt nhất cho tất cả mọi người có cơ hội tiếp cận và luyện tập bất cứ lúc nào.'
                },

            ]
        }
    }
    render() {
        return (
            <div className={'Home'}>
                <div className={'Home__Banner'}>
                    <div className={'Home__Banner-content'}>
                        <Container>
                            <Row>
                                <Col xs={6}>
                                    <h1>Chào mừng đến với CodeGym Bob!</h1>
                                    <h5>
                                        CodeGym Bob là một nền tảng hỗ trợ các lập trình viên học, luyện tập thuật toán và kỹ năng giải quyết vấn đề. Các bài luyện tập trong CodeGym Bob được thiết kế để dẫn dắt và nâng kỹ năng của lập trình viên theo từng cấp độ.

                                        Nền tảng CodeGym Bob được cung cấp hoàn toàn miễn phí.
                                    </h5>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <img className={'Home__Banner-img'} src={Banner} alt=""/>
                </div>
                <div className={'Home__Info my-5'}>
                    <Container>
                        <Row>
                            {
                                this.state.list.map((article,index) => {
                                    return <Col key={index} xs={3} className={'p-2'} onClick={() => this.props.showLogin()}>
                                        <ArticleIntro article={article}/>
                                    </Col>
                                })
                            }
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Home