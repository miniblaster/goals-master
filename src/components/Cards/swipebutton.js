import React, {Fragment, useEffect, ReactPropTypes as PropTypes} from 'react';
import ReactSwipeButton from "./../../staticcomponents/ReactSwipeButton.es";
import Grid from "@material-ui/core/Grid";
import './card.css'
import {reactLocalStorage} from "reactjs-localstorage";
import config from "../../config/config";
import {callApi} from "../../services/api";
import LinearWithValueLabel from "../../helpers/LinearWithValueLabel";
import {makeStyles} from "@material-ui/core/styles";
import LinearProgressWithLabel from "../../helpers/LinearWithValueLabel";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});
export default function SwipeButton (props) {
    const [is_bet, setIsbet] = React.useState(false);

    const classes = useStyles();
    const [progress, setProgress] = React.useState(props.event_details.bet_time);

    // useEffect(() => {
    //     setIsbet(props.event_details.is_bet)
    // })

    useEffect(() => {
        if(props.event_details.bet_time > 0 && props.event_details.bet_time <= 59){
            const timer = setInterval(() => {
                setProgress((prevProgress) => (props.event_details.bet_time >= 57 ? 57 : props.event_details.bet_time + 1));
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }

    });

    const handleMessage = (message, severity) => {
        let data = [{message,severity}]
        reactLocalStorage.set("messageAlertData",JSON.stringify(data))
    }
    const normalise = value => (value - 0) * 100 / (57);

    const onSuccess = () => {
        if(reactLocalStorage.get('token')){
            if(parseInt(reactLocalStorage.get('balance')) === 0 || parseInt(reactLocalStorage.get('balance')) < props.bet_amount){
                handleMessage("You dont have sufficient Balance!", "error")
                setIsbet(false)
            }
            else{

                // call update balance api
                const payload = {
                    url: config.api_url+"events/bet/",
                    method: 'POST',
                    data: {
                        event_id: props.event_details.id,
                        betty365_id: props.event_details.betty365_id,
                        betty_id: props.event_details.betty_id,
                        email: reactLocalStorage.get('email') ,
                        bet_amount: props.bet_amount,
                        win_amount:  props.win_amount,
                        home_score: props.event_details.home_score,
                        away_score: props.event_details.away_score,
                    }
                };

                callApi(payload).then(response => {

                    if(response.data && response.data.status){
                        const previousBalance = reactLocalStorage.get("balance")
                        const currentBalance = previousBalance-props.bet_amount
                        reactLocalStorage.set("balance", currentBalance)

                        setTimeout(()=>{
                            setIsbet(false)
                        },59000)
                        setProgress(0)
                        handleMessage(response.data.response, "success")
                        // call update balance api
                        const payload = {
                            url: config.api_url+"user/balance/",
                            method: 'POST',
                            data: {
                                email: reactLocalStorage.get('email') ,
                                balance: currentBalance,
                            }
                        };

                        callApi(payload).then(response => {

                        })

                    } else{
                        handleMessage(response.data.response, "error")
                        setIsbet(false)
                    }
                    setIsbet(true)
                })
                .catch((error) => {
                    handleMessage(error.message, "error")
                    setIsbet(false)
                });
            }

        }
        else{
            handleMessage("Please Register or Login to play", "error")
            setTimeout(()=>{
                setIsbet(false)
            },100)
        }
    }

    return (
        <Fragment>
            <div className="row swipe-button">
                <div className="row">
                    <div className="col  pd-t sec-clr f4">
                        Goal In Next 60 Sec &nbsp;
                        <button className="btn d30" type="button"><span className="">&euro;{props.win_amount}</span></button>
                    </div>
                </div>
                {
                    props.event_details.is_bet && (
                    <Grid container spacing={5} className="m-0 pl-1">
                        <Grid item xs={12} lg={12}>
                            <div className={classes.root}>
                                <LinearProgressWithLabel value={normalise(progress)} />
                            </div>
                        </Grid>
                    </Grid>)
                }

                <Grid container spacing={3} className="m-0">
                    <Grid item xs={0} lg={3}>

                    </Grid>
                    <Grid item xs={12} lg={6} className="swipeButton">
                        {
                            !props.event_details.is_bet ? (
                            <ReactSwipeButton
                                key={props.event_details.betty_id}
                                style={{    background: '#ffffff4d',
                                    color: '#3a3d55'}}
                                text='SWIPE TO BET'
                                color='#fff'
                                unlocked={is_bet}
                                text_unlocked="BET PLACED"
                                onSuccess={onSuccess}
                            />
                        ) : (
                                <div className="placed">
                                    Bet Placed
                                </div>
                            )
                        }
                    </Grid>
                    <Grid item xs={0} lg={3}>

                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}
