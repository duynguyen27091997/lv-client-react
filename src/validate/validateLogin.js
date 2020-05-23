export default function validate(values) {
    let errors = {};
    //validate email
    if (!values.email)
        errors.email = 'Email không được để trống !';
    else if (!/^.+@.+\..+$/.test(values.email))
        errors.email = 'Email không hợp lệ !';
    //validate password
    if (!values.password)
        errors.password = 'Password không được để trống !';
    else if (values.password.length < 6)
        errors.password = 'Password không ít hơn 6 kí tự !';
    return errors;
}