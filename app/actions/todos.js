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

function fetchTodosSuccess(body) {
    return {
        type: types.FETCH_TODOS_SUCCESS,
        body,
    };
}

function fetchTodosFailure(ex) {
    return {
        type: types.FETCH_TODOS_FAILURE,
        ex,
    }
}

function fetchTodosRequest() {
    return {
        type: types.FETCH_TODOS_REQUEST,
    }
}

export function fetchTodos() {
    return dispatch => {
        dispatch(fetchTodosRequest());
        return fetch('/todos')
            .then(res => res.json())
            .then(body => dispatch(fetchTodosSuccess(body)))
            .catch(ex => dispatch(fetchTodosFailure(ex)));
    };
}