import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {AxiosBe} from "../utils/axios";

const ActiveEmail = (props) => {
    let [success,setSuccess] = useState(false);
    let [error,setError] = useState('');
    useEffect(_ => {
        try {
            let data = props.location.search.split('=');
            data.shift();
            AxiosBe.get(`/api/sign-up?data=${data.join('=')}`)
                .then(({data:res})=>{
                    if (res.success){
                        setSuccess(true)
                        setError(res.message)
                    }else{
                        setSuccess(false)
                        setError("Có lỗi trong quá trình kích hoạt")
                    }
                })
                .catch(err =>{
                    setSuccess(false)
                    setError("Có lỗi trong quá trình kích ")
                })

        } catch (e) {

        }
    }, [])
    if (success)
    return (

        <main className={"box-active"}>
            <h3 style={{maxWidth:"50vw"}}>{error}</h3>
            <p className={"mt-5"}> Click vào nút phía dưới để đăng nhâp</p>
            <div onClick={props.showLogin} className={'button-active'}>Đăng nhập</div>
        </main>
    );
    else
        return (
            <main className={"box-active"}>
                <h3>. . .</h3>
                <h4>{error}</h4>
            </main>
        );
};

export default withRouter(ActiveEmail);