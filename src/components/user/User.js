import React, {Component} from 'react';
import {connect} from "react-redux";
import {logOut} from "../../actions/rootActions";
import swal from 'sweetalert';
import ModalChangePass from "../modal/ModalChangePass";

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
            showChangePass: false
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({showMenu: true}, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {

        if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {

            this.setState({showMenu: false}, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }

    handleLogout() {
        this.props.dispatch(logOut());
        localStorage.removeItem('token');
        swal({
            title: 'Bạn đã đăng xuất khỏi tài khoản',
            icon: 'error'
        }).then(r => r)
    }
    render() {
        let {user} = this.props;
        if (user) {
            return (
                <div className={'user'}>
            <span className={'user__avatar'}>
                <i className="las la-user"/>
            </span>
                    <span className={'ml-3'} onClick={this.showMenu}>
                {user.username}
                        <i className="ml-2 las la-caret-down"/>

            </span>
                    {
                        this.state.showMenu
                            ? (
                                <div className={'user__dropdown'} ref={(element) => {
                                    this.dropdownMenu = element;
                                }}>
                                    <ul>
                                        <li onClick={() => {
                                            this.setState({showChangePass: true})
                                        }}><i className="las la-lock"/> Đổi mật khẩu
                                        </li>
                                        <li onClick={() => {
                                            this.handleLogout()
                                        }}><i className="las la-power-off mr-2"/> Đăng xuất
                                        </li>
                                    </ul>
                                </div>)
                            :
                            null
                    }
                    <ModalChangePass show={this.state.showChangePass} closeModal={() => {this.setState({showChangePass: false})}}/>
                </div>
            );
        }else {
            return <div/>
        }
    }
}

export default connect()(User);