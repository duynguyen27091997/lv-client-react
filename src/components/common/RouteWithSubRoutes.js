import React from 'react';
import {Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
const RouteWithSubRoutes = (route) => {
    const user = useSelector(state=> state.main.user);
    if (user)
    return (
        <Route exact={route.exact} path={route.path} render={props => {
            return <route.component {...props} routes={route.routes} showLogin={route.showLogin} />
        }}>
        </Route>
    );
    else
        return <Redirect to={'/'} />
};

export default RouteWithSubRoutes;