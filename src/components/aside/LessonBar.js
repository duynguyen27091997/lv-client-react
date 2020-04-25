import React from 'react';
import CircleProcess from "../common/CircleProcess";

const LessonBar = () => {
    return (
        <div className={'Aside__Tab'}>
            <div className={'Aside__Process'}>
                <CircleProcess percent={30}/>
            </div>
        </div>
    );
};

export default LessonBar;