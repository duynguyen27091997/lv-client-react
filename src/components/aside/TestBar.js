import React from 'react';

const TestBar = (props) => {
    const startTest = ()=>{
        props.startTest()
    }
    return (
        <div className={'Aside__Tab'}>
            <h4 className={'Title py-2'}>Bạn có muốn làm lại Bài kiểm tra?</h4>
            <p className={'mb-1'}>Điểm gần đây nhất của bạn {props.info.lastScore}</p>
            <p className={'mb-1'}>Điểm cao nhất đạt được {props.info.bestScore}</p>
            <p className={'mb-1'}>Số lần thực hiện {props.info.attemptNumber}/3</p>
            {!props.assessment &&<button onClick={startTest} className={'Button mt-4'}>Làm bài kiểm tra</button>}
        </div>
    );
};

export default TestBar;