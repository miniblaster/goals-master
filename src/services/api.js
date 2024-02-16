import axios from "axios";
import config from "../config/config";
import {reactLocalStorage} from 'reactjs-localstorage';

export const callApi = async (data) =>{
    const url = data.url;
    const method = data.method;
    const payload = data.data;
    const headers = data.headers ? data.headers : undefined

    return await new Promise((resolve, reject) => {
        axios.defaults.headers.common['Content-Type'] = `application/json`;
        axios
            .request({
                url: url,
                method: method,
                data: payload,
                headers: headers
            })

            // taking action on response
            .then(response => {
                resolve(response);
            })

            //  handling error
            .catch((error) => {
                reject(error);
            });
    });
};

export const isLogin= async () => {
    const url = config.django_url+"api/token/verify/";
    const method = "POST";
    const payload = {
        token: reactLocalStorage.get('token')
    };

    return await new Promise((resolve, reject) => {
        axios.defaults.headers.common['Content-Type'] = `application/json`;
        axios
            .request({
                url: url,
                method: method,
                data: payload
            })

            // taking action on response
            .then(response => {
                resolve(response);
            })

            //  handling error
            .catch((error) => {
                reject(error);
            });
    });
}

export const getUser= async () => {
    const url = config.django_url+"users/self/info/";
    const method = "GET";
    const payload = {}

    return await new Promise((resolve, reject) => {
        axios
            .request({
                url: url,
                method: method,
                data: payload,
                headers:{
                    'Authorization': `Bearer ${reactLocalStorage.get('token')}`,
                    'Accept' : `application/json, text/plain, */*`,
                    'Content-Type' :`application/json`,
                }
            })

            // taking action on response
            .then(response => {
                resolve(response);
            })

            //  handling error
            .catch((error) => {
                reject(error);
            });
    });
}
