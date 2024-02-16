import React from 'react';
import AppRouter from "../routes/router";
import {ThemeProvider} from "@material-ui/core/styles";
import {theme} from "./Panel/theme";
import {Provider} from "react-redux";
import configureStore from "../redux/store";
import {pullUserInfo} from "../redux/actions/userActions";
const store = configureStore();

store.dispatch(pullUserInfo());
const jsx = (props) => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppRouter />
        </ThemeProvider>
    </Provider>

);

export default jsx
