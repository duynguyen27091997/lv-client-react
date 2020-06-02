import React, {useEffect, useState, forwardRef , useImperativeHandle } from 'react';
import {Container, Navbar, Row, Col} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './Header.scss';
import Logo from '../assets/img/logo_transparent.png'
import ModalRegister from "../components/modal/ModalRegister";
import ModalLogin from "../components/modal/ModalLogin";
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import User from "../components/user/User";
import ModalForgotPass from "../components/modal/ModalForgotPass";

const Header = forwardRef((props,ref) => {

    useImperativeHandle(ref, () => ({
        toggle() {
            setLogin(!login);
        }

    }));
    const [showForgotPass, setShowForgotPass] = useState(false);
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const user = useSelector(state => state.main.user);
    const history = useHistory();
    useEffect(_ => {
        if (history.location.search === '?login' && !user) {
            setLogin(true)
        }
    }, [history.location.search, user]);

    return (
        <div className={'Header'}>
            <Container>
                <Row>
                    <Col>
                        <Navbar className={' p-0'}>
                            <div className={'d-flex justify-content-between w-100 align-items-center'}
                                 style={{height: '60px'}}>
                                <Navbar.Brand className={'p-0'}>
                                    <Link to={'/'}>
                                        <img height={50} className={'Header__logo'} src={Logo} alt=""/>
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
                                        <div>
                                            <button className={'Button text-uppercase'}
                                                    onClick={() => setLogin(true)}>
                                                Bắt đầu ngay
                                            </button>
                                            <ModalRegister showRegister={register}
                                                           closeModal={() => setRegister(false)}
                                                           switchLogin={() => {
                                                               setRegister(false);
                                                               setLogin(true)
                                                           }}/>
                                            <ModalLogin showLogin={login} closeModal={() => setLogin(false)}
                                                        switchRegister={() => {
                                                            setLogin(false);
                                                            setRegister(true)
                                                        }}
                                                        forgotPassword={() => setShowForgotPass(true)}/>
                                            <ModalForgotPass show={showForgotPass}
                                                             closeModal={() => setShowForgotPass(false)}/>
                                        </div>
                                }
                            </div>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    )
})

export default Header;