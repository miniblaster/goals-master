import React, {Fragment} from 'react';
import './spinner.css';

// import { connect } from 'react-redux';
const Spinner = (props) => {
    return (
        <Fragment>

            {props.loading ?
                <div className="loading">
                    <div className="overlay__inner">
                        <div className="overlay__content"><span className="spinner"></span></div>
                    </div>
                </div>: ""
            }
        </Fragment>)
};

// const mapStateToProps = (state) =
//
//     return {
//         loading: state.spinner
//     };
// };

// export default connect(mapStateToProps)(Spinner);
export default Spinner;