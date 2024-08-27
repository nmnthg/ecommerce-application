import {compose, createStore, applyMiddleware} from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return next (action);
    } 

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState())
}

const middleWares = [loggerMiddleware]; 

const composedEnhancers = compose(applyMiddleware(...middleWares));
/*Middleware provides a way to extend Redux with custom functionality. It 
can intercept actions before they reach the reducer, allowing you to add 
features like logging, crash reporting, or asynchronous API calls. In this 
code, redux-logger is being used as middleware to log state changes. */


export const store = createStore(rootReducer, undefined, composedEnhancers);

