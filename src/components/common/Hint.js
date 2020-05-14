import React, {useState} from 'react';
import {Collapse} from "react-bootstrap";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
const Hint = ({tutorial}) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
        {
            tutorial.trim() ?
                <div>
                    <div
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                <span className={'text-primary hint-button'} >
                    <HelpOutlineIcon/>Gợi ý
                </span>
                    </div>
                    <Collapse in={open}>
                        <div id="example-collapse-text" >
                            <div className={'hint-content'}>
                                {tutorial}
                            </div>
                        </div>
                    </Collapse>
                </div>
                :
                null
        }
        </div>
    );
};

export default Hint;