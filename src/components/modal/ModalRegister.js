import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import './ModalRegister.scss'
import PropTypes from 'prop-types';
import useForm from "../../helpers/userForm";
import validate from "../../validate/validateRegister";
import {useDispatch} from "react-redux";
import {signUp} from "../../actions/rootActions";
import swal from "sweetalert";

const ModalRegister = (props) => {
    let [resErr, setResErr] = useState('');
    const stateSchema = {
        email: '',
        name: '',
        tel: '',
        password: '',
        rePassword: ''
    };
    const {handleChange, handleSubmit, values, errors, resetForm} = useForm(stateSchema, submit, validate);
    const dispatch = useDispatch();
    //close modal
    const handleClose = () => {
        props.closeModal()
    };

    function submit() {
        let params = {
            roleId: 3,
            email: values.email,
            username: values.name,
            password: values.password,
            mobile: values.tel,
            countryId: 241
        }
        dispatch(signUp(params))
            .then(({data: res}) => {
                if (res.success) {
                    swal({
                        title: res.message,
                        icon: "success",
                        button: false,
                        timer: 1500
                    }).then(r => r)
                    resetForm();
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
        <Modal show={props.showRegister} onHide={handleClose} id={'ModalRegister'}>
            <Modal.Body className={'p-5'}>
                <h4 className={'Title text-center pb-4'}>Đăng Ký</h4>
                {resErr && <div className="alert alert-danger" role="alert">
                    {resErr}
                </div>}
                <form>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="email" value={values.email} name={'email'} onChange={handleChange}/>
                        {errors.email && <small className={'text-danger'}>{errors.email}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input type="text" name={'name'} value={values.name} onChange={handleChange}/>
                        {errors.name && <small className={'text-danger'}>{errors.name}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Số điện thoại</label>
                        <input type="tel" name={'tel'} value={values.tel} onChange={handleChange}/>
                        {errors.tel && <small className={'text-danger'}>{errors.tel}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input type="password" name={'password'} value={values.password} onChange={handleChange}/>
                        {errors.password && <small className={'text-danger'}>{errors.password}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Nhập lại password</label>
                        <input type="password" name={'rePassword'} value={values.rePassword} onChange={handleChange}/>
                        {errors.rePassword && <small className={'text-danger'}>{errors.rePassword}</small>}
                    </div>
                    <div className="form-group pt-4">
                        <button onClick={handleSubmit} className={'Button Button--full'}>Đăng ký</button>
                    </div>
                    <div className="form-group pt-3 text-center">
                        <p>Đã có tài khoản ? <span className={'text-underline Link'} onClick={props.switchLogin}>Đăng Nhập</span>
                        </p>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};
ModalRegister.propsTypes = {
    showRegister: PropTypes.bool
};
export default ModalRegister;