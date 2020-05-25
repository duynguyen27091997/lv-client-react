import React from 'react';
import Header from './partials/Header';
import routes from "./routes";
import './App.css';
import {Route, Switch} from "react-router-dom";
import Footer from "./partials/Footer";
import RouteWithSubRoutes from "./components/common/RouteWithSubRoutes";
import Startup from "./components/Startup";
import {withRouter} from "react-router-dom";
import Home from "./pages/Home";
import ActiveEmail from "./pages/ActiveEmail";

function App() {
    const routeComponents = routes.map((route, key) => <RouteWithSubRoutes{...route} key={key} />);
    return (
        <Startup className="App">
            <Header/>
            <Switch>
                {routeComponents}
                <Route path={'/active'} component={()=><ActiveEmail/>}/>
                <Route path={'/'} component={()=><Home/>}/>
            </Switch>
            <Footer/>
        </Startup>
    );
}

export default withRouter(App);
