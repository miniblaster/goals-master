import React, {Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {Badge, IconButton} from "@material-ui/core";
import {
    AccountCircle,
    DateRange, GraphicEq, Help, Inbox, InfoRounded, Mail,
    MonetizationOn, RefreshRounded, Report, Settings, Tv
} from "@material-ui/icons";
import './top-app-bar.css';
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from "@material-ui/core/Grid";
import {sideBarStyles} from "../Panel/theme";
import Signup from "../Signup/signup";
import Login from "../Login/login";
import {reactLocalStorage} from 'reactjs-localstorage';
import Deposits from "../Deposits/deposits";
import History from "../History/history";

const useStyles = makeStyles(sideBarStyles);


export default function TopAppBar(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const [openLogin, setOpenLogin] = React.useState(false);
    const [openDeposit, setOpenDeposit] = React.useState(false);
    const [openSignup, setOpenSignup] = React.useState(false);
    const [openHistory, setOpenHistory] = React.useState(false);

    const handleClickOpenSignup = () => {
        setOpenSignup(true);
    };

    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    const handleCloseSignup = () => {
        setOpenSignup(false);
    };

    const handleClickOpenDeposit = () => {
        setOpenDeposit(true);
    };

    const handleClickOpenHistory = () => {
        setOpenHistory(true);
    };

    const handleCloseDeposit = () => {
        setOpenDeposit(false);
    };

    const handleCloseHistory = () => {
        setOpenHistory(false);
    };

    const handleLogout = () =>{
        // console.log("logOut")
        reactLocalStorage.clear()
    }
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <IconButton  edge="start" className="menu-button" aria-label="menu">
                            <AccountCircle className="white-icon" fontSize="large" />
                        </IconButton>
                    </ListItemIcon>
                    {
                        reactLocalStorage.get('token') === undefined || reactLocalStorage.get('token') === 'undefined'  ? (
                            <Fragment>
                                <ListItemText primary="Login"  onClick={handleClickOpenLogin} className="text-sm sidebar-text" classes={{primary:classes.listItemText}}/>
                                <ListItemText primary="Signup" onClick={handleClickOpenSignup} className="text-sm sidebar-text" classes={{primary:classes.listItemText}}/>
                            </Fragment>
                        ) : (
                                reactLocalStorage.get('name') ? (
                                    <Fragment>
                                        <ListItemText primary={reactLocalStorage.get('name')} className="text-sm sidebar-text" classes={{primary:classes.listItemText}}/>
                                    </Fragment>
                                ) : null

                        )
                    }
                </ListItem>
            </List>
            <Divider classes={{root: classes.dividerColor}} />
            <List>
                <ListItem button className="pt-0 pb-0">
                    <ListItemIcon>
                        <IconButton edge="start" className="menu-button" aria-label="menu" >
                            <AccountCircle className="white-icon"/>
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary="Profile" className="text-sm sidebar-text" classes={{primary:classes.listItemText}}/>
                </ListItem>

                <ListItem button className="pt-0 pb-0">
                    <ListItemIcon>
                        <IconButton edge="start" className="menu-button" aria-label="menu">
                            <GraphicEq className="white-icon"/>
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary="Stats" className="text-sm sidebar-text" classes={{primary:classes.listItemText}}/>
                </ListItem>

                <ListItem button className="pt-0 pb-0">
                    <ListItemIcon>
                        <IconButton edge="start" className="menu-button" aria-label="menu">
                            <Tv className="white-icon"/>
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary="Live Streaming" className="text-sm sidebar-text" classes={{primary:classes.listItemText}}/>
                </ListItem>
            </List>
            <Divider classes={{root: classes.dividerColor}} />
            <List>
                <ListItem button  className="pt-0 pb-0">
                    <ListItemIcon>
                        <IconButton edge="start" className="menu-button" aria-label="menu">
                            <Settings className="white-icon"/>
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary="Settings" className="text-sm sidebar-text" classes={{primary:classes.listItemText}}/>
                </ListItem>
            </List>

            <Divider classes={{root: classes.dividerColor}} />
            <List>
                <ListItem button  className="pt-0 pb-0">
                    <ListItemIcon>
                        <IconButton edge="start" className="menu-button" aria-label="menu">
                            <Help className="white-icon"/>
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary="Help" className="text-sm sidebar-text" classes={{primary:classes.listItemText}}/>
                </ListItem>

                <ListItem button  className="pt-0 pb-0">
                    <ListItemIcon>
                        <IconButton edge="start" className="menu-button" aria-label="menu">
                            <InfoRounded className="white-icon"/>
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary="About" className="text-sm sidebar-text" classes={{primary:classes.listItemText}}/>
                </ListItem>
            </List>

            {
                reactLocalStorage.get('token') ? (
                    <Fragment>
                        <Divider classes={{root: classes.dividerColor}} />
                        <List>
                            <ListItem button  className="pt-0 pb-0">
                                <ListItemIcon>
                                    <IconButton edge="start" className="menu-button" aria-label="menu">
                                        <RefreshRounded className="white-icon"/>
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText primary="Logout" onClick={handleLogout} className="text-sm sidebar-text" classes={{primary:classes.listItemText}}/>
                            </ListItem>
                        </List>
                    </Fragment>
                ) : null
            }


            <div className="footer-text">
                Betty365 - Version 1.0
            </div>
        </div>
    );


    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <Fragment>
            <CssBaseline />
            <AppBar color="primary" position="fixed" className="pt-1">
                <Toolbar>
                    <Grid container spacing={3}>
                        <Grid item xs={2} lg={3} className="text-left" >
                            <IconButton  onClick={toggleDrawer("left", true)} edge="start" className="menu-button" color="inherit" aria-label="menu">
                                <AccountCircle />
                            </IconButton>
                            <SwipeableDrawer
                                classes={{ paper: classes.paper }}
                                anchor="left"
                                open={state["left"]}
                                onClose={toggleDrawer("left", false)}
                                onOpen={toggleDrawer("left", true)}
                            >
                                {list("left")}
                            </SwipeableDrawer>
                            <Signup open={openSignup} handleClose={handleCloseSignup}/>
                            <Login open={openLogin} handleClose={handleCloseLogin}/>
                        </Grid>

                        <Grid item xs={5} lg={5} className="text-right pr-0 ">
                            <Typography variant="h6" color="inherit" className="ml-5 mt-2 page-title">
                                {props.topBarTitle}
                            </Typography>
                        </Grid>

                        {
                            reactLocalStorage.get('token')!== undefined? (
                                <Grid item xs={5} lg={4} className="text-right">
                                    <div className="ml-auto">
                                        <IconButton edge="end" color="inherit" aria-label="menu" >
                                            <DateRange onClick={handleClickOpenHistory} />
                                        </IconButton>
                                        <IconButton className="ml-5p" aria-label="display earned coins" color="inherit"  onClick={handleClickOpenDeposit}>
                                            <Badge max={9999} badgeContent={reactLocalStorage.get('balance')} color="secondary">
                                                <MonetizationOn/>
                                            </Badge>
                                        </IconButton>
                                        <Deposits open={openDeposit} handleClose={handleCloseDeposit}/>
                                        <History open={openHistory} handleClose={handleCloseHistory}/>
                                    </div>
                                </Grid>
                            ) : null
                        }

                    </Grid>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}
