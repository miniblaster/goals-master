import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useLocalStorage from 'react-use-localstorage';

import './deposits.css'
import {Link} from "@material-ui/core";
import config from "../../config/config";
import {callApi, getUser} from "../../services/api";
import {reactLocalStorage} from "reactjs-localstorage";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    background:{
        backgroundColor: '#424169'
    },
    textColor:{
        color:'#eee'
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
        color:'#9190a9'
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Deposits = (props) => {
    const classes = useStyles();

    const defaultDepositLabel = "Card Number"
    const defaultDepositButtonLabel = "Deposit"
    const [depositButtonLabel, setDepositButtonLabel] = React.useState(defaultDepositButtonLabel)
    const [depositError, setErrorDeposit] = React.useState(false)
    const [card, setCard] = React.useState('')
    const [depositLabel, setDepositLabel] = React.useState(defaultDepositLabel)
    
    const handleDeposit = async (e) => {
        e.preventDefault();

        const payload = {
            url: config.django_url+"prepaid-card-deposit/",
            method: 'POST',
            data:{
                code: card,
            },
            headers:{
                'Authorization': `Bearer ${reactLocalStorage.get('token')}`,
                'Accept' : `application/json, text/plain, */*`,
                'Content-Type' :`application/json`,
            }
        };
        setDepositButtonLabel("Processing...")
        // calling get user initial data
        await callApi(payload).then(response => {
            if(response.data){
                setDepositButtonLabel(defaultDepositButtonLabel)

                getUser().then(response => {
                    const previousBalance= reactLocalStorage.get('balance')
                    if(response.data.balance){
                        let data = [{message:response.data.balance-previousBalance+" is deposited to your account.",severity:"success"}]
                        reactLocalStorage.set("messageAlertData",JSON.stringify(data))
                    }
                    reactLocalStorage.set('balance',response.data.balance)
                    setErrorDeposit(false)
                    setDepositLabel(defaultDepositLabel)
                    // props.handleClose()
                })

            }
        })
        .catch((error) => {
            const errors = error.response && error.response.data ? error.response.data : undefined
            setDepositButtonLabel(defaultDepositButtonLabel)
            if(errors.code){
                const errored = errors.code[0]

                if(errored.includes("This code has been used")){
                    let data = [{message:"This code has been used.",severity:"error"}]
                    reactLocalStorage.set("messageAlertData",JSON.stringify(data))
                }

                setErrorDeposit(true)
                setDepositLabel(defaultDepositLabel+" ("+errors.code[0]+")")
            }else{
                setErrorDeposit(false)
                setDepositLabel(defaultDepositLabel)
            }
            if(errors.detail){
                setErrorDeposit(true)
                setDepositLabel(defaultDepositLabel+" ("+errors.detail+")")
            }
        });
    }

    return (
        <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Deposit
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid xs={0} lg={3}>

                </Grid>

                <Grid xs={12} lg={6}>
                    <List>
                        <ListItem>
                            <ListItemText className={classes.textColor} primary="Please enter your card number to deposit the amount in your wallet."/>
                        </ListItem>
                        <Divider />
                        <ListItem  style={{display:'flex', justifyContent:'center'}} >
                            <h5 className="text-info">Your Current Balance: {reactLocalStorage.get('balance')}</h5>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <TextField type="number"
                                       error={depositError}
                                       value={card}
                                       onChange={(e)=> setCard(e.target.value)}
                                       required
                                       className={classes.formControl}
                                       id="card-required"
                                       label={depositLabel}
                                       placeholder="Please Enter Card Number"/>
                        </ListItem>
                        <ListItem>
                            <Button variant="contained" color="primary" className={classes.formControl} onClick={handleDeposit}>
                                {depositButtonLabel}
                            </Button>
                        </ListItem>
                    </List>
                </Grid>

                <Grid xs={0} lg={3}>

                </Grid>
            </Grid>
        </Dialog>
    );
}

// mapping states to props
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(
    mapStateToProps
)(Deposits);
