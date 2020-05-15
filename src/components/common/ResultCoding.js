import React from 'react';

const ResultCoding = () => {
    return (
        <div>
            <h5>Kết quả</h5>
            <div className={'result-coding'}>
                <div className={'Code__Result text-left mt-4'}>
                    <div className="alert alert-success" role="alert">
                        This is a success alert—check it out!
                    </div>
                    <div className="alert alert-danger" role="alert">
                        This is a danger alert—check it out!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCoding;