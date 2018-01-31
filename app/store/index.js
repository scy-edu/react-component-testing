'use strict';

import {
    createStore,
    applyMiddleware,
} from 'redux';

import middlewares from '../middlewares';
import rootReducer from '../reducers';

let createStoreWithMiddleware = applyMiddleware(
    ...middlewares
)(createStore);

function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}

export default configureStore();