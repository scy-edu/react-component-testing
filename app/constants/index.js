'use strict';

import keyMirror from 'keymirror';

const types = keyMirror({
    ADD_TODO: null,
    DELETE_TODO: null,

    // get todos
    FETCH_TODOS_REQUEST: null,
    FETCH_TODOS_SUCCESS: null,
    FETCH_TODOS_FAILURE: null,
});

export default types;