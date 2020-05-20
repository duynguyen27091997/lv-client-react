import React, {useState} from 'react';
import Header from './partials/Header';
import routes from "./routes";
import './App.css';
import {Route, Switch} from "react-router-dom";
import Footer from "./partials/Footer";
import RouteWithSubRoutes from "./components/common/RouteWithSubRoutes";
import Startup from "./components/Startup";
import {useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Home from "./pages/Home";
import ActiveEmail from "./pages/ActiveEmail";

function App(props) {
    const user = useSelector(state => state.main.user);
    const [showLogin,setShowLogin]  = useState(false);
    const [showRegister,setShowRegister]  = useState(false);
    function handleCloseModalLogin(){
        setShowLogin(false);
    }
    function handleCloseModalRegister(){
        setShowRegister(false);
    }
    function handleShowLogin() {
        if (!user){
            setShowLogin(true);
            setShowRegister(false);
        }else{
            props.history.push('/courses')
        }
    }

    function handleShowRegister() {
        if (!user){
            setShowLogin(false);
            setShowRegister(true);
        }else{

        }
    }
    const routeComponents = routes.map((route, key) => <RouteWithSubRoutes showLogin={handleShowLogin} {...route} key={key} />);
    return (
        <Startup className="App">
            <Header login={showLogin} register={showRegister} closeLogin={handleCloseModalLogin} closeRegister={handleCloseModalRegister} showLogin={handleShowLogin} showRegister={handleShowRegister}/>
            <Switch>
                {routeComponents}
                <Route path={'/active'} component={()=><ActiveEmail showLogin={handleShowLogin}/>}/>
                <Route path={'/'} component={()=><Home showLogin={handleShowLogin}/>}/>
            </Switch>
            <Footer/>
        </Startup>
    );
}

export default withRouter(App);
