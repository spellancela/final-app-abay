/* eslint-disable no-unused-vars */
import React from "react";

import classes from  './Layout.module.css';
const Layout = (props) => {

    return (<div className={`${classes.card} ${props.className}`}>
        {props.children}
    </div>)
}

export default Layout;