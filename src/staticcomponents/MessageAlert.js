import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {reactLocalStorage} from "reactjs-localstorage";
import './messageAlert.css'

const MyApp = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    setInterval(() =>{
        if(reactLocalStorage.get("messageAlertData")){
            const messageData = JSON.parse(reactLocalStorage.get("messageAlertData"))
            if(messageData && messageData.length > 0){
                messageData.forEach((obj)=>{
                    const variant = obj.severity
                    enqueueSnackbar(obj.message, {variant});
                })
            }
            reactLocalStorage.set("messageAlertData",[])
        }
    },1000)


    return(
        <div></div>
    )

}

export default function IntegrationNotistack(props) {
    return (
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={5000}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <MyApp variant="success"/>
        </SnackbarProvider>
    );
}
