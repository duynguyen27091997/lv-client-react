export default function validate(values) {
    let errors = {};
    //validate email
    if (!values.email)
        errors.email = 'Email không được để trống !';
    else if (!/^.+@.+\..+$/.test(values.email))
        errors.email = 'Email không hợp lệ !';

    if (!values.name)
        errors.name = 'Tên không được để trống !';

    //validate password
    if (!values.password)
        errors.password = 'Password không được để trống !';
    else if (values.password.length < 6)
        errors.password = 'Password không ít hơn 6 kí tự !';

    // eslint-disable-next-line no-self-compare
    if (values.rePassword !== values.password)
        errors.rePassword = 'Không trùng với mật khẩu';
    return errors;
}