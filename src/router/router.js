import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from '../../src/pages/login/login';
import Redirect from "react-router-dom/Redirect";


const ReactRouter = () => {
    return (
        <Router basename={'/2018-2019/dcs/dev_271'}>
            <Switch>
                <Route path={`/login`} component={Login} />
                <Redirect from ={`/`} to={`/login`}/>
            </Switch>
        </Router>
    );
}

export default ReactRouter;