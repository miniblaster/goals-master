import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { DataGrid } from '@material-ui/data-grid';
import '../History/history.css'
import config from "../../config/config";
import {callApi, getUser} from "../../services/api";
import {reactLocalStorage} from "reactjs-localstorage";
import Grid from "@material-ui/core/Grid";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import HistoryTable from "./table";

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const History = (props) => {
    const classes = useStyles();
    const [history, setHistory] = useState({})

    useEffect(()=>{
        const payload = {
            url: config.api_url+"user/history?email="+reactLocalStorage.get('email'),
            method: 'GET',
        };
        // calling get user initial data
        callApi(payload).then(response => {
            if(response.data){
                setHistory(response.data)
            }
        })
        .catch((error) => {
            let data = [{message:error.message,severity:"error"}]
            reactLocalStorage.set("messageAlertData",JSON.stringify(data))
        });
    },[props])
    return (
        <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        History
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid xs={0} lg={3}>

                </Grid>

                <Grid xs={12} lg={6} className="mt-5 pt-4 p-3">
                    <HistoryTable data={history} />
                </Grid>

                <Grid xs={0} lg={3}>

                </Grid>
            </Grid>
        </Dialog>
    );
}

export default History