import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import useForm from "../../helpers/userForm";
import swal from "sweetalert";
import {AxiosBe} from "../../utils/axios";

const ModalForgotPass = (props) => {

    let [resErr, setResErr] = useState('');

    const stateSchema = {
        email: ''
    };
    const validate = () => {
        let errors = {};
        if (!values.email)
            errors.email = 'Email không được để trống !';
        else if (!/^.+@.+\..+$/.test(values.email))
            errors.email = 'Email không hợp lệ !';

        return errors;
    }
    const {handleChange, handleSubmit, values, errors} = useForm(stateSchema, submit, validate);
    const handleClose = () => {
        props.closeModal()
    };

    function submit() {
        AxiosBe.get(`/api/forgot-password?email=${values.email}`)
            .then(({data: res}) => {
                if (res.success) {
                    swal({
                        title: "Mật khẩu đã được gửi tới email của bạn !",
                        icon: "success",
                        button: false,
                        timer: 1500
                    }).then()
                } else {
                    setResErr(res.message)
                }
            }).catch(err => {
            setResErr(err.message)
        })
    }

    return (
        <Modal show={props.show} onHide={handleClose} id={'ModalRegister'}>
            <Modal.Body className={'p-5'}>
                <h4 className={'Title text-center pb-4'}>Đổi mật khẩu</h4>
                {resErr && <div className="alert alert-danger" role="alert">
                    {resErr}
                </div>}
                <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input
                            name={'email'} type="email" placeholder={'Nhập Email của bạn *'} value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <small className={'text-danger'}>{errors.email}</small>}
                        {/*error message here*/}
                    </div>
                    <div className="form-group pt-4">
                        <button type={'submit'} className={'Button Button--full'}>Gửi</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalForgotPass;