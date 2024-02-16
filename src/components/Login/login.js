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

import './login.css'
import {Link} from "@material-ui/core";
import config from "../../config/config";
import {callApi, getUser} from "../../services/api";
import {reactLocalStorage} from "reactjs-localstorage";

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


const Login = (props) => {
    const classes = useStyles();

    const defaultEmailLabel = "Email Address"
    const defaultPasswordLabel = "Password"
    const defaultloginButtonLabel = "Signin"
    const [loginButtonLabel, setLoginButtonLabel] = React.useState(defaultloginButtonLabel)
    const [emailError, setErrorEmail] = React.useState(false)
    const [emailPassword, setErrorPassword] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [emailLabel, setEmailLabel] = React.useState(defaultEmailLabel)
    const [passwordLabel, setPasswordLabel] = React.useState(defaultPasswordLabel)

    const [token, setToken] = useLocalStorage('token', undefined);
    const [refresh, setRefresh] = useLocalStorage('refresh', undefined);

    const handleLogin = async (e) => {
        e.preventDefault();

        const payload = {
            url: config.django_url+"api/token/",
            method: 'POST',
            data:{
                email,
                password
            }
        };
        setLoginButtonLabel("Signing in...")
        // calling get user initial data
        await callApi(payload).then(response => {
            if(response.data){
                setToken(response.data.access)
                setRefresh(response.data.refresh)
                setLoginButtonLabel(defaultloginButtonLabel)

                getUser().then(response => {
                    reactLocalStorage.set('email',response.data.email)
                    reactLocalStorage.set('balance',response.data.balance)
                    reactLocalStorage.set('birth_date',response.data.birth_date)
                    reactLocalStorage.set('name',response.data.first_name+" "+response.data.last_name)



                    setErrorEmail(false)
                    setErrorPassword(false)
                    setEmailLabel(defaultEmailLabel)
                    setPasswordLabel(defaultPasswordLabel)
                    props.handleClose()
                })

            }
        })
        .catch((error) => {
            const errors = error.response && error.response.data ? error.response.data : undefined
            setLoginButtonLabel(defaultloginButtonLabel)
            if(errors.email){
                setErrorEmail(true)
                setEmailLabel(defaultEmailLabel+" ("+errors.email[0]+")")
            }else{
                setErrorEmail(false)
                setEmailLabel(defaultEmailLabel)
            }
            if(errors.password){
                setErrorPassword(true)
                setPasswordLabel(defaultPasswordLabel+" ("+errors.password[0]+")")
            }
            else{
                setErrorPassword(false)
                setPasswordLabel(defaultPasswordLabel)
            }
            if(errors.detail){
                setErrorEmail(true)
                setEmailLabel(defaultPasswordLabel+" ("+errors.detail+")")
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
                        Login
                    </Typography>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem>
                    <ListItemText className={classes.textColor} primary="Please enter accurate information. You must need to login to play."/>
                </ListItem>
                <Divider />
                <ListItem>
                    <TextField type="email"
                               error={emailError}
                               value={email}
                               onChange={(e)=> setEmail(e.target.value)}
                               required
                               className={classes.formControl}
                               id="email-required"
                               label={emailLabel}
                               placeholder="Email Address"/>
                </ListItem>
                <ListItem>
                    <TextField type="password"
                               error={emailPassword}
                               value={password}
                               onChange={(e)=> setPassword(e.target.value)}
                               required className={classes.formControl}
                               id="password-required"
                               label={passwordLabel}
                               placeholder="Password"/>
                </ListItem>
                <ListItem>
                    <Button variant="contained" color="primary" className={classes.formControl} onClick={handleLogin}>
                        {loginButtonLabel}
                    </Button>
                </ListItem>
                <ListItem>
                    <Link
                        className={classes.formControl}
                        component="button"
                        variant="body2"
                        onClick={() => {
                            console.info("I'm a button.");
                        }}
                    >
                        Forgot Password?
                    </Link>
                </ListItem>
            </List>
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
)(Login);
