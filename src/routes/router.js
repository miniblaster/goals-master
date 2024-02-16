import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import MarkUp from "../components/Markup";

import Panel from "../components/Panel/panel";
import Home from "../components/Home";

let MarkupRoute="/markup";
let HomeRoute="/";
let ReactConversion="/react-conversion";

function AppRouter() {
    return(
        <Router>
            <Switch>
                <Route path={HomeRoute} component={Home} exact />
                <Route path={MarkupRoute} component={MarkUp} exact/>
                <Route path={ReactConversion} component={Panel} exact/>
            </Switch>
        </Router>
    )
}

export default AppRouter