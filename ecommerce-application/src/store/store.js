import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from 'redux-persist';

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

const persistConfig = {
    key: 'root',
    storage: storageSession, // use sessionStorage instead of localStorage
    blacklist: ['user'] //we do not want to persist the user because we are getting that value from firebase auth
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware]; 

const composedEnhancers = compose(applyMiddleware(...middleWares));
/*Middleware provides a way to extend Redux with custom functionality. It 
can intercept actions before they reach the reducer, allowing you to add 
features like logging, crash reporting, or asynchronous API calls. In this 
code, redux-logger is being used as middleware to log state changes. */


export const store = createStore(persistReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
