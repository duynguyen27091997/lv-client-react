import React from 'react';
import CircleProcess from "../common/CircleProcess";

const ExerciseBar = () => {
    return (
        <div className={'Aside__Tab'}>
            <div className={'Aside__Process'}>
                <CircleProcess percent={20}/>
            </div>
            <div className={'Aside__List'}>
                <div className={'text-left'}>
                    <div>
                        <div className={'btn btn-primary'}>Bài 1</div>
                        <ul>
                            <li className={'badge badge-success'}>Câu 1</li>
                            <li className={'badge badge-secondary'}>Câu 2</li>
                            <li className={'badge badge-secondary'}>Câu 3</li>
                            <li className={'badge badge-secondary'}>Câu 4</li>
                            <li className={'badge badge-secondary'}>Câu 5</li>
                        </ul>
                    </div>
                    <div>
                        <div className={'btn btn-primary'}>Bài 2</div>
                    </div>
                    <div>
                        <div className={'btn btn-primary disabled'}>Bài 3</div>
                    </div>
                    <div>
                        <div className={'btn btn-primary'}>Bài 4</div>
                    </div>
                    <div>
                        <div className={'btn btn-primary'}>Bài 5</div>
                    </div>
                    <div>
                        <div className={'btn btn-primary'}>Bài 6</div>
                    </div>
                    <div>
                        <div className={'btn btn-primary'}>Bài 7</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseBar;