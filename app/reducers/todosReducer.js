'use strict';

import types from '../constants';

export const initialState = [
    {
        text: 'use Redux',
        completed: false,
        id: 0,
    }
];

export default function todos(
    state = initialState, 
    action
) {
    switch (action.type) {

        case types.ADD_TODO:
            return [
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    completed: false,
                    text: action.text,
                },
                ...state
            ];

        case types.DELETE_TODO:
            return state.filter((todo, index) => {
                return index !== action.index;
            });

        case types.FETCH_TODOS_SUCCESS:
            return [
                ...action.body.todos.map((todo, index) => {
                    return {
                        id: index,
                        text: todo,
                        completed: false,
                    };
                }),
                ...state,
            ];
        default:
            return state;
    }
}