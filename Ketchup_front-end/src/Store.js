import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

export default store;
