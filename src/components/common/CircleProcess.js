import React from 'react';
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

const CircleProcess = ({percent}) => {
    return (
        <CircularProgressbar
            value={percent}
            text={`${percent}%`}
            strokeWidth={7}
            styles={buildStyles({
                textColor: "#2980b9",
                pathColor: "#2980b9",
            })}
        />
    );
};

export default CircleProcess;