import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import useForm from "../../helpers/userForm";
import validate from "../../validate/validateLogin";
import {login} from "../../actions/rootActions";
import {useDispatch} from "react-redux";
import swal from "sweetalert";

const ModalLogin = (props) => {
    let [resErr, setResErr] = useState('');
    const stateSchema = {
        email: '',
        password: ''
    };
    const dispatch = useDispatch();
    const {handleChange, handleSubmit, values, errors} = useForm(stateSchema, submit, validate);
    const handleClose = () => {
        props.closeModal()
    };

    function submit() {
        dispatch(login({email: values.email, password: values.password}))
            .then(({data: res}) => {
                if (res.success) {
                    swal({
                        title: res.message,
                        icon: "success",
                        button: false,
                        timer:1500
                    }).then(r => r)
                    handleClose()
                } else {
                    setResErr(res.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Modal show={props.showLogin} onHide={handleClose} id={'ModalRegister'}>
            <Modal.Body className={'p-5'}>
                <h4 className={'Title text-center pb-4'}>Đăng Nhập</h4>
                {resErr && <div className="alert alert-danger" role="alert">
                    {resErr}
                </div>}
                <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input
                            name={'email'} type="email" placeholder={'Email *'} value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <small className={'text-danger'}>{errors.email}</small>}
                        {/*error message here*/}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input
                            onChange={handleChange}
                            name={'password'} type="password" placeholder={'Password *'} value={values.password}
                        />
                        {errors.password && <small className={'text-danger'}>{errors.password}</small>}
                        {/*error message here*/}
                    </div>
                    <div className="form-group pt-4">
                        <button type={'submit'} className={'Button Button--full'}>Đăng Nhập</button>
                    </div>
                    <div className="form-group pt-3 text-center">
                        <p>Chưa có tài khoản ? <span className={'text-underline Link'} onClick={props.switchRegister}>Đăng Ký</span>
                        </p>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalLogin;