import React, {Fragment} from 'react';
import MatchTimer from "./timer";

export default function MatchInfo (props) {
    const event_details = props.event_details

    return (
        <Fragment>
            <div className="row lr-margin lg-pdd martial-pdd matchinfo">
                <table width="100%">
                    <tr>
                        <td width="32%" style={{ verticalAlign: 'bottom'}}>
                            <div className="text-center f1-size">
                                <img src={event_details.home_image} className="img-size" alt="logo" />
                                <br/>
                                <span style={{verticalAlign: 'bottom'}}>{event_details.home}</span><br/>
                            </div>
                        </td>

                        <td width="32%" style={{ verticalAlign: 'bottom'}}>
                            <div className="col c2 t-align">
                                <span className="vsc">{event_details.home_score}
                                    <span className="hiphen"> - </span>{event_details.away_score}
                                </span>
                                <br/>
                                <span className="vsc2"> VS </span>
                                <br/>
                                <MatchTimer md={event_details.md}/>
                                {/*<span className="refc refont"> Ref Andre Marriner <br/>Att 65.221</span>*/}
                            </div>
                        </td>

                        <td width="32%" style={{ verticalAlign: 'bottom'}}>
                            <div className=" text-center f1-size">
                                <img src={event_details.away_image} className="img-size" alt="logo" />
                                <br/><span style={{verticalAlign: 'bottom'}}>{event_details.away}</span><br/>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </Fragment>
    )
}