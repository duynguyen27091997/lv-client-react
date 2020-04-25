import React from 'react';

const TestBar = () => {
    return (
        <div className={'Aside__Tab'}>
            <h4 className={'Title py-2'}>Bạn có muốn làm lại Bài kiểm tra?</h4>
            <p className={'mb-1'}>Điểm gần đây nhất của bạn 1/8</p>
            <p className={'mb-1'}>Điểm cao nhất đạt được 6/8</p>
            <p className={'mb-1'}>Số lần thực hiện 2</p>
            <button className={'Button mt-4'}>Làm bài kiểm tra</button>
        </div>
    );
};

export default TestBar;