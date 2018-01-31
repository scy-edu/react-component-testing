'use strict';

import {
    combinedReducers,
} from 'redux';

import todos from './todosReducer';

const rootReducer = combinedReducers({
    todos,
});

export default rootReducer;