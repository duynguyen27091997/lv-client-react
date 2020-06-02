import React, {useRef} from 'react';
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
    const headerRef = useRef();

    const routeComponents = routes.map((route, key) => <RouteWithSubRoutes{...route} key={key} />);
    return (
        <Startup className="App">
            <Header ref={headerRef}/>
            <Switch>
                {routeComponents}
                <Route path={'/active'} component={()=><ActiveEmail/>}/>
                <Route path={'/'} component={()=><Home onClick={()=>headerRef.current.toggle()}/>}/>
            </Switch>
            <Footer/>
        </Startup>
    );
}

export default withRouter(App);
