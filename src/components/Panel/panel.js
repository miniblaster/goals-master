import React, {Component, Fragment, PureComponent} from 'react';
import TopAppBar from "../TopAppBar/top-app-bar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import './panel.css';
import Content from "../../components/Content/content-carousel";
import Spinner from "../../staticcomponents/spinner";
import config from "../../config/config";
import {callApi, getUser, isLogin} from "../../services/api";
import {reactLocalStorage} from 'reactjs-localstorage';
import IntegrationNotistack from "../../staticcomponents/MessageAlert";
import Grid from "@material-ui/core/Grid";

const topBarTitle='Betty365'
class Panel extends PureComponent {
    constructor(props) {
        super(props);

        this.state ={
            is_loading:true,
            live_events_count:0,
            live_events: {status:false, results:{}, total:0}
        }

    }

    componentDidMount() {
        if(!reactLocalStorage.get("bet_amount")){
            reactLocalStorage.set("bet_amount", 20)
            reactLocalStorage.set("win_amount", (20*0.5)+20)
        }

        try {
            if(reactLocalStorage.get('token')){
                getUser().then(response => {
                    reactLocalStorage.set('email',response.data.email)
                    reactLocalStorage.set('balance',response.data.balance)
                    reactLocalStorage.set('birth_date',response.data.birth_date)
                    reactLocalStorage.set('name',response.data.first_name+" "+response.data.last_name)
                })
            }

            this.interval = setInterval(async () => {
                let params = ""
                if(reactLocalStorage.get("token")){
                    params =  `?email=${reactLocalStorage.get("email")}`
                }
                const payload = {
                    url: config.api_url+"events/live"+params,
                    method: 'GET',
                };
                // calling get user initial data
                await callApi(payload).then(response => {
                    const live_events = response.data
                    const existedEvents = this.state.live_events
                    if(existedEvents.results.length > 0){

                        // console.log("Existing events ")
                        live_events.results.forEach((obj)=>{
                            // adding new events in the list
                            const isPresent = existedEvents.results.some(item => item.betty_id === obj.betty_id)
                            if(!isPresent){
                                // console.log("new match added")
                                // this.setState({results});
                                this.setState(prevState => ({
                                    ...prevState,
                                    live_events: {
                                        ...prevState.live_events,
                                        results: [...prevState.live_events.results, obj]

                                    }
                                }))
                            }

                            //updating scores and time seemlessly
                            if(isPresent){
                                this.setState({live_events: live_events})
                                // const search = ob => ob.betty_id === obj.betty_id;
                                //
                                // const objIndex = existedEvents.results.findIndex(search);
                                //
                                // if(objIndex !== undefined && objIndex >= 0){
                                //     // 1. Make a shallow copy of the items
                                //     let items = [...existedEvents.results];
                                //
                                //     items[objIndex] = {...items[objIndex], md: obj.md}
                                //     items[objIndex] = {...items[objIndex], home_score: obj.home_score}
                                //     items[objIndex] = {...items[objIndex], away_score: obj.away_score}
                                //
                                //     this.setState(prevState => ({
                                //         ...prevState,
                                //         live_events: {
                                //             ...prevState.live_events,
                                //             results: items
                                //
                                //         }
                                //     }))
                                // }

                            }
                        })

                        //removing ended events from list
                        existedEvents.results.forEach((obj)=>{
                            const isPresent = live_events.results.some(item => item.betty_id === obj.betty_id)
                            if(!isPresent){
                                // console.log("removing ended match")

                                const filtered = this.state.live_events.results.filter(
                                    (event, i) => event.betty_id !== obj.betty_id
                                );
                                this.setState(prevState => ({
                                    ...prevState,
                                    live_events: {
                                        ...prevState.live_events,
                                        results: filtered

                                    }
                                }))
                                // console.log(this.state.live_events)
                            }
                        })
                    }
                    else{
                        // console.log("new events")
                        this.setState({live_events: live_events});
                    }
                    // this.setState({ live_events: response.data.results})
                    this.setState({live_events_count: response.data.results ? response.data.results.length : 0 })
                    this.setState({is_loading:false})
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({is_loading:false})
                });

                const payload1 = {
                    url: config.api_url+"events/processPendingBets",
                    method: 'GET',
                };
                await callApi(payload1).then(response => {
                    if(response.data.response && response.data.response.length > 0){
                        const responseData = response.data.response
                        let messageAlertData = []
                        responseData.forEach((obj)=>{
                            if(obj.is_win){
                                const previousBalance = reactLocalStorage.get("balance")
                                const currentBalance = parseInt(previousBalance)+parseInt(obj.win_amount)
                                reactLocalStorage.set("balance", currentBalance)

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
                            }
                            messageAlertData.push({
                                message: obj.message,
                                severity: obj.is_win ? "success" : "error"
                            })
                        })
                        reactLocalStorage.set("messageAlertData",JSON.stringify(messageAlertData))
                    }
                })
            }, 3000);

            this.interval = setInterval(async () => {
                if(reactLocalStorage.get('token')){
                    await getUser().then(response => {
                        reactLocalStorage.set('email',response.data.email)
                        reactLocalStorage.set('balance',response.data.balance)
                        reactLocalStorage.set('birth_date',response.data.birth_date)
                        reactLocalStorage.set('name',response.data.first_name+" "+response.data.last_name)
                    })

                    await isLogin().then(response => {
                        if(response.data && response.data.length === 0){
                            reactLocalStorage.clear()
                        }
                    })
                }

            }, 30000);
        } catch(e) {
            this.setState({is_loading:false})
            console.log(e);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            !this.state.is_loading ? (
                <Fragment>
                    <IntegrationNotistack />
                    <Grid container className="m-0 p-0">
                        <TopAppBar topBarTitle={topBarTitle} />
                        <Content events={this.state.live_events.results} />
                    </Grid>
                </Fragment>
            ) : (
                <Spinner loading={this.state.is_loading}/>
            )
        );
    }
}

export default Panel;