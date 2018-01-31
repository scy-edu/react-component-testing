'use strict';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

// configure the middleware in an array
const middlewares = [
    thunkMiddleware,
];

// create the mock store
const mockStore = configureMockStore(middlewares);

export default mockStore;