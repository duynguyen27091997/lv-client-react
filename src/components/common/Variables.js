import React, {useEffect, useState} from 'react';

const Variables = (props) => {
    const [isNew ,setIsNew] = useState(true);
    const [nameVal ,setNameVal] = useState('');
    const [valVal ,setValVal] = useState('');
    function handleChangeName(e) {
        setNameVal(e.target.value);
    }
    function handleChangeValue(e) {
        setValVal(e.target.value);
    }
    useEffect(_=>{
        if (isNew && nameVal && valVal){
            props.createNew();
            setIsNew(false);
        }
    }, [isNew, nameVal, valVal, props]);
    return (
        <div className={'d-flex form-group'}>
            <input value={nameVal} onChange={e =>handleChangeName(e)} className={'form-control'} type="text" placeholder={'Tên biến : a,b,c'}/>
            <input value={valVal} onChange={e => handleChangeValue(e)} className={'form-control ml-2'} type="text" placeholder={['Giá trị : 1,2,3']}/>
        </div>
    );
};

export default Variables;