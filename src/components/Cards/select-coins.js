import React, {Fragment} from 'react';
import {reactLocalStorage} from "reactjs-localstorage";

export default function SelectCoins (props) {
    const [betAmount, setBetAmount] = React.useState(20)

    const handleChangeAmount = (amount) =>{
        props.onCoinChange(amount)
        setBetAmount(amount)
    }

    const handleIncreaseChangeAmount = () =>{
        setBetAmount(betAmount+1)
        props.onCoinChange(betAmount+1)
    }

     // function to handle change decrease in amount
    const handleDecreaseChangeAmount = () =>{
        if(betAmount-1 >= 5){
            setBetAmount(betAmount-1)
            props.onCoinChange(betAmount-1)
        }
    }

    return (
        <Fragment>
            <div className="coins">
                <div className="quantity">
                    <div className="row pd-button">
                        <div className="col">
                            <button key={props.event_details.id+4} className="btn minus-btn" type="button" onClick={handleDecreaseChangeAmount}><span className="pm-class">-</span>
                            </button>
                            &nbsp;&nbsp;
                            <input key={props.event_details.id+5} type="text" id="quantity" value={betAmount} />&nbsp;&nbsp;
                            <button key={props.event_details.id+6} className="btn plus-btn" type="button" onClick={handleIncreaseChangeAmount}><span className="pm-class">+</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="dollar">
                    <button key={props.event_details.id+1} className="btn d1" type="button" onClick={()=>handleChangeAmount(5)}><span className="">&euro;5</span></button>
                    <button key={props.event_details.id+2} className="btn d2" type="button" onClick={()=>handleChangeAmount(10)}><span className="">&euro;10</span></button>
                    <button key={props.event_details.id+3} className="btn d3" type="button" onClick={()=>handleChangeAmount(20)}><span className="">&euro;20</span></button>
                </div>
            </div>
        </Fragment>
    )
}
