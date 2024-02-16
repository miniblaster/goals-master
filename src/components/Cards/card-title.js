import React, {Fragment} from 'react';

export default function CardTitle (props) {
    return (
        <Fragment>
            <div className="title">
                <div className="row">
                    <div className="col-12 t-align f3-size pt-2">
                        {props.title}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}