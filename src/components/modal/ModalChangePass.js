import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import useForm from "../../helpers/userForm";
import {changePass} from "../../actions/rootActions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";

const ModalChangePass = (props) => {
    const user = useSelector(state => state.main.user);
    let [resErr, setResErr] = useState('');
    const stateSchema = {
        pass: '',
        newPass: '',
        newPassRe: ''
    };
    const dispatch = useDispatch();
    const history = useHistory();
    const validate = ()=>{
        let errors = {};
        //validate name
        if (!values.pass)
            errors.pass = 'Bạn chưa nhập mật khẩu cũ !';

        if (!values.newPass){
            errors.newPass = 'Mật khẩu mới không được để trống !';
        }else if (values.newPass.length < 6)
            errors.password = 'Password không ít hơn 6 kí tự !';

        if (values.newPassRe !== values.newPass){
            errors.newPassRe = 'Không trùng với mật khẩu mới!';
        }else if (values.newPassRe.length < 6)
            errors.password = 'Password không ít hơn 6 kí tự !';

        return errors;
    }
    const {handleChange, handleSubmit, values, errors} = useForm(stateSchema, submit, validate);
    const handleClose = () => {
        props.closeModal()
    };

    function submit() {
        dispatch(changePass({email:user.email,password:values.pass,newPassword:values.newPass}))
            .then(({data: res}) => {
                if (res.success) {
                    swal({
                        title: "Đổi mật khẩu thành công. Vui lòng đăng nhập lại",
                        icon: "success",
                        button: false,
                        timer:1500
                    }).then(r => r)
                    localStorage.removeItem('token');
                    history.push('/?login')
                    // resetForm();
                } else {
                    setResErr(res.message)
                }
            })
            .catch(err => {
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
                        <label htmlFor="">Mật khẩu cũ</label>
                        <input
                            name={'pass'} type="password" placeholder={'Mật khẩu cũ *'} value={values.pass}
                            onChange={handleChange}
                        />
                        {errors.pass && <small className={'text-danger'}>{errors.pass}</small>}
                        {/*error message here*/}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Mật khẩu mới</label>
                        <input
                            onChange={handleChange}
                            name={'newPass'} type="password" placeholder={'Mật khẩu mới *'} value={values.newPass}
                        />
                        {errors.newPass && <small className={'text-danger'}>{errors.newPass}</small>}
                        {/*error message here*/}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Xác nhận mật khẩu</label>
                        <input
                            onChange={handleChange}
                            name={'newPassRe'} type="password" placeholder={'Nhập lại mật khẩu mới *'} value={values.newPassRe}
                        />
                        {errors.newPassRe && <small className={'text-danger'}>{errors.newPassRe}</small>}
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

export default ModalChangePass;