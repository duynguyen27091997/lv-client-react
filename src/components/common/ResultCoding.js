import React from 'react';

const ResultCoding = (props) => {
    return (
        <div>
            <h5>Kết quả</h5>
            <div className={'result-coding'} style={{maxHeight:1000,overflow:'auto'}}>
                <div className={'Code__Result text-left mt-4'}>
                    {/*<div className="alert alert-success" role="alert">*/}
                    {/*    Hoan hô ! Bạn đã trả lời chính xác !*/}
                    {/*</div>*/}
                    <div className="alert alert-danger" role="alert">
                        Sai mất rồi ! Tìm câu trả lời khác thôi !
                    </div>
                    <div>
                        {props.err}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCoding;