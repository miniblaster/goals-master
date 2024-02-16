import React, {useEffect} from 'react';
import CardTitle from "./card-title";
import MatchInfo from "./match-info";
import SelectCoins from "./select-coins";
import './card.css';
import SwipeButton from "./swipebutton";
import {reactLocalStorage} from "reactjs-localstorage";
import Grid from "@material-ui/core/Grid";

export default function Card (props) {
    const event_details = props.event_details
    const [betAmount, setBetAmount] = React.useState(reactLocalStorage.get("bet_amount") ? reactLocalStorage.get("bet_amount") : 20)
    const [winAmount, setWinAmount] = React.useState(reactLocalStorage.get("win_amount") ? reactLocalStorage.get("win_amount") : (20*0.5)+20)


    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    const handleChangeAmount = (amount) => {
        setBetAmount(amount)
        setWinAmount(Math.round((amount*0.5)+amount))
    }
    return (
        <Grid container className="card-bg" style={props.customStyle}>
            <Grid  lg={3} xs={0}>

            </Grid>

            <Grid  lg={6} xs={12} className='mt-5 pt-4'>
                <CardTitle md={event_details.md} ts={event_details.ts} title={event_details.league} date={formatDate(event_details.date).toString().toUpperCase()} />
                <MatchInfo event_details={event_details}/>
                <SwipeButton event_details={event_details} bet_amount={betAmount} win_amount={winAmount}/>
                <SelectCoins event_details={event_details} bet_amount={betAmount} win_amount={winAmount} onCoinChange={handleChangeAmount}/>
            </Grid>

            <Grid  lg={3} xs={0}>

            </Grid>
        </Grid>
    )
}

