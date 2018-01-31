"use strict";

import * as actions from '../../app/actions/todos';
import types from '../../app/constants';
import mockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

describe('todos actions', () => {
    it('has an action to add todos', () => {
        const text = 'Finish creating lesson';
        const expectedAction = {
            type: types.ADD_TODO,
            text,
        };

        expect(actions.addTodo(text)).toEqual(expectedAction);
    });

    it('has an action to delete todos', () => {
        const index = 1;
        const expectedAction = {
            type: types.DELETE_TODO,
            index,
        };

        expect(actions.deleteTodo(index)).toEqual(expectedAction);
    });
});

describe('async todos actions', () => {
    // define the variables
    let store;

    beforeEach(() => {
        store = mockStore({
            todos: [],
        });
    });

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('creates FETCH_TODOS_SUCCESS when fetching has been done', () => {
        fetchMock
            .getOnce('/todos', { 
                body: { 
                    todos: ['do something']
             }, headers: { 
                 'content-type': 'application/json' 
                } });
        
            const expectedActions = [
                {
                    type: types.FETCH_TODOS_REQUEST,
                },
                {
                    type: types.FETCH_TODOS_SUCCESS,
                    body: {
                        todos: [
                            'do something'
                        ]
                    }
                }
            ];

        return store.dispatch(actions.fetchTodos()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

});