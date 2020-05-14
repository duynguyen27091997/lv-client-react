import React, {useEffect, useState} from 'react';

import {setAuth} from "../actions/rootActions";
import {useDispatch} from "react-redux";
import {AxiosBe} from "../utils/axios";

const Startup = (props) => {
    const [loading , setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(_ => {
        let token = localStorage.getItem('token');
        AxiosBe.post('api/check-login', {token})
            .then(({data: res}) => {
                if (res.success) {
                    dispatch(setAuth(res.data.user));
                }
            })
            .catch(err => {
                dispatch(setAuth({}));
            })
            .finally(_=>{
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!loading)
    return (
        <div>
            {props.children}
        </div>
    );
    else
        return <div/>
};

export default Startup;