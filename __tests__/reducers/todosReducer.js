'use strict';

import todosReducer, {
    initialState,
} from '../../app/reducers/todosReducer';
import types from '../../app/constants';

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(todosReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle ADD_TODO', () => {
        expect(todosReducer(undefined, {
            type: types.ADD_TODO,
            text: 'Run 2 miles',
        }))
        .toEqual([
            {
                text: 'Run 2 miles',
                completed: false,
                id: 1,
            },
            ...initialState,
        ]);
    });

    it('should handle DELETE_TODO', () => {
        expect(todosReducer(undefined, {
            type: types.DELETE_TODO,
            index: 0,
        }))
        .toEqual([]);
    });

    it('should handle FETCH_TODOS', () => {
        expect(todosReducer(undefined, {
            type: types.FETCH_TODOS_SUCCESS,
            body: {
                todos: [
                    'Do something awesome',
                    'Join a book club',
                ]
            }
        }))
        .toEqual([
            {
                text: 'Do something awesome',
                completed: false,
                id: 0,
            },
            {
                text: 'Join a book club',
                completed: false,
                id: 1,
            },
            ...initialState,
        ]);
    });
});