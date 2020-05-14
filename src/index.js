import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import "react-circular-progressbar/dist/styles.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducer/rootReducer";
import courseReducer from "./reducer/courseReducer";

const store = createStore(combineReducers({
        main:rootReducer,
        course:courseReducer
    }),
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
        ))
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter><App/></BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
