import React from 'react';
import classes from '../../css/Spinner.module.css'

const spinner = (props) => {
    return(
        props.show ?<div className={classes.loader}>Loading...</div> : null
    );
}
export default spinner;