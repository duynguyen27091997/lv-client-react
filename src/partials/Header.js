import React, {Component} from 'react';
import {Container, Navbar, Row, Col} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './Header.scss';
import Logo from '../assets/img/logo_transparent.png'
import ModalRegister from "../components/modal/ModalRegister";
import ModalLogin from "../components/modal/ModalLogin";
import {connect} from 'react-redux';
import User from "../components/user/User";

class Header extends Component {
    render() {
        let {user} = this.props;
        return (
            <div className={'Header'}>
                <Container>
                    <Row>
                        <Col>
                            <Navbar className={' p-0'}>
                                <div className={'d-flex justify-content-between w-100 align-items-center'}>
                                    <Navbar.Brand className={'p-0'}>
                                        <Link to={'/'}>
                                            <img height={60} className={'Header__logo'} src={Logo} alt=""/>
                                        </Link>
                                    </Navbar.Brand>
                                    {
                                        user ?
                                            <div className={"Header__list"}>
                                                <Link to={'/courses'}>Khoá học</Link>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        user ?
                                            <User user={user}/>
                                            :
                                            <button className={'Button text-uppercase'}
                                                    onClick={() => this.props.showLogin()}>
                                                Bắt đầu ngay
                                            </button>
                                    }
                                    <ModalRegister showRegister={this.props.register}
                                                   closeModal={this.props.closeRegister}
                                                   switchLogin={this.props.showLogin}/>
                                    <ModalLogin showLogin={this.props.login} closeModal={this.props.closeLogin}
                                                switchRegister={this.props.showRegister}/>
                                </div>
                            </Navbar>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.main.user
    }
}

export default connect(mapStateToProps)(Header);