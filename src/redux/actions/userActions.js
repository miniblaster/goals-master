import {getUser} from "../../services/api";

export const pullUserInfo =   () => {
    return  (dispatch) => {
        // getUser().then(response => {
        //     console.log(response)
        //     dispatch(infoAction(response));
        // })
    };
};



export const infoAction = (user) => {
    return {
        type:"GET_USER",
        "user":user
    }
};