import React, {Component, Fragment} from 'react';
import Timer from "react-compound-timer";

class MatchTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeMatch: this.props.md
        }
    }
    componentDidMount() {
        setInterval(()=>{
            // console.log(this.props.md)
            this.setState({timerMatch: this.props.md})
            // console.log(this.state.timeMatch)
        },5000)

    }


    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-12 t-align">
                    <span className="f7">
                        {/*{props.date}<br/>*/}
                        {/*<b>{props.tm} : {props.ts}</b>*/}
                        {

                            this.state.timeMatch === 0 || this.state.timeMatch === '0' ? ( "00:00") : (
                                <Timer
                                    initialTime={this.state.timeMatch}
                                    direction="forward"
                                    lastUnit="m"
                                >
                                    {() => (
                                        <React.Fragment>
                                            <Timer.Minutes  formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} /> : <Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />
                                        </React.Fragment>
                                    )}
                                </Timer>
                            )
                        }

                    </span>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MatchTimer