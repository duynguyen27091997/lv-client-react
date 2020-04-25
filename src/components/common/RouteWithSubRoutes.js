import React from 'react';
import {Route} from "react-router-dom";

const RouteWithSubRoutes = (route) => {
    return (
        <Route exact={route.exact} path={route.path} render={props => {
            return <route.component {...props} routes={route.routes} showLogin={route.showLogin} />
        }}>
        </Route>
    );
};

export default RouteWithSubRoutes;