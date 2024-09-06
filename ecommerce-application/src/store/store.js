import { createStore, applyMiddleware, compose } from 'redux'; // Import necessary functions from Redux
import { rootReducer } from './root-reducer'; // Import the root reducer
import createSagaMiddleware from 'redux-saga'; // Import createSagaMiddleware for Saga middleware
import logger from 'redux-logger'; // Import logger middleware for logging actions
import { persistStore, persistReducer } from 'redux-persist'; // Import functions for Redux Persist
import storage from 'redux-persist/lib/storage'; // Import storage for Redux Persist
import { rootSaga } from './root-saga'; // Import the root saga

// Configuration for Redux Persist
const persistConfig = {
    key: 'root',
    storage, // Define the storage method
    blacklist: ['user'], // Exclude 'user' from persistence (e.g., for security reasons)
};

// Create a persisted reducer using the configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create saga middleware instance
const sagaMiddleware = createSagaMiddleware();

// Define middlewares array
const middlewares = [
    process.env.NODE_ENV !== 'production' && logger, // Add logger middleware in non-production environments
    sagaMiddleware, // Add saga middleware
].filter(Boolean); // Remove any falsy values (e.g., in production, logger will be undefined)

// Set up Redux DevTools extension support if in development mode
const composeEnhancers =
    (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Create the store with middleware and Redux DevTools support
const store = createStore(
    persistedReducer, // Use the persisted reducer
    composeEnhancers(applyMiddleware(...middlewares)) // Apply middleware and compose enhancers
);

// Run the root saga
sagaMiddleware.run(rootSaga);

// Create a persistor for the store
export const persistor = persistStore(store);

// Export the store
export default store;