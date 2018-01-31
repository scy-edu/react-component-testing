'use strict';

import types from '../constants';

export function addTodo(text) {
    return {
        type: types.ADD_TODO,
        text,
    }
}

export function deleteTodo(index) {
    return {
        type: types.DELETE_TODO,
        index,
    };
} 