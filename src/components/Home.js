import React, {Fragment} from "react";
import {Link} from "react-router-dom";


const home =() => {
    return(
        <Fragment>
            <Link to={'/markup'} className="button">Design Markup</Link>
            <Link to={'/react-conversion'} className="button">React Converted Design</Link>
        </Fragment>
    )
}

export default home