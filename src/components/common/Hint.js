import React, {useState} from 'react';
import {Collapse} from "react-bootstrap";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
const Hint = () => {
    const [open, setOpen] = useState(false);
    return (
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
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default Hint;