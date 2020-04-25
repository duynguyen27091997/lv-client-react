import React, {useState} from 'react';
import Header from './partials/Header';
import routes from "./routes";
import './App.css';
import {Switch} from "react-router-dom";
import Footer from "./partials/Footer";
import RouteWithSubRoutes from "./components/common/RouteWithSubRoutes";

function App() {
    const [showLogin,setShowLogin]  = useState(false);
    const [showRegister,setShowRegister]  = useState(false);
    function handleCloseModalLogin(){
        setShowLogin(false);
    }
    function handleCloseModalRegister(){
        setShowRegister(false);
    }
    function handleShowLogin() {
        setShowLogin(true);
        setShowRegister(false);
    }

    function handleShowRegister() {
        setShowLogin(false);
        setShowRegister(true);
    }
    const routeComponents = routes.map((route, key) => <RouteWithSubRoutes showLogin={handleShowLogin} {...route} key={key} />);
    return (
        <div className="App">
            <Header login={showLogin} register={showRegister} closeLogin={handleCloseModalLogin} closeRegister={handleCloseModalRegister} showLogin={handleShowLogin} showRegister={handleShowRegister}/>
            <Switch>
                {routeComponents}
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
