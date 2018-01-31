"use strict";

import * as actions from '../../app/actions/todos';
import types from '../../app/constants';

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