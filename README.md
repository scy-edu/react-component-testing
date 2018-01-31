# Testing in React Native & Redux

## What is Test-Driven Development (TDD)?

Test-driven development is a process that relies on repetition of a very short development cycle: Requirements are turned into very specific test cases, then the software is written and improved to pass the tests.

- Write the requirements (README Driven Development)
- Write the test **FIRST**
- Run the test (should fail -- sanity check)
- Write the software
- Run the test (should pass -- yay!)
- Refactor (optional, can we improve this code?)

## Why should I TDD?

- Confidence in the code
- Provide support for refactoring
- Enables teams to move faster
- Eliminates 40-80% bugs (according to Microsoft Research, IBM)

## Can I write tests after I write the code?

**Do not write tests after the code -- it is miserable to sit and write tests for hours!!**

- You will forget tests
- You won't test every use case
- Your code will not be modularized for testing

## Why is React awesome?

**React Core** in version 16 does not know anything about the renderers (Native, DOM, VR). It is completely decoupled from the DOM. It is independent of the renderers. 

React enables us to write fast and robust tests easily.

**Developers often skip writing tests if they are hard to write and slow to run.**

## Setting up our React Native app

Download from Github

```
git clone 
```

## README Driven Development

Just think of the requirements of what you need and write them down, like this: 

```
describe('<Button />', () => {
	describe('rendering', () => {
		it('should render correctly');
		it('should render a label');
		it('should render a <TouchableOpacity />');
		
		describe('no type provided', () => {
			it('should have the default style');
		});
		
		describe('primary type', () => {
			it('should have the primary style');
		});
	});
	
	describe('interaction', () => {
		describe('clicking the button', () => {
			it('should call the onClick callback');
		});
	});
});
```

Seems super easy, right? 

The key to this is to make the requirements *read like plain English.* Any developer should be able to read your tests and understand exactly what the component is supposed to do. 

We didn't write any tests yet. We just described what we are about to build. We don't want to hinder our creativity when we are doing RDD.

## Snapshot testing

Create the component in `app/components/Button.js`:

```
import React from 'react';

// a component that renders nothing
const Button = ({}) => ();

export default Button;

```

In `__tests__/components/Button.js`

```
import 'react-native';
import React from 'react';
import Button, {
  styles,
} from '../../app/components/Button';

import renderer from 'react-test-renderer';
import {
  shallow,
} from 'enzyme';

describe('rendering', () => {
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow(<Button />);
	});
	
	it('should render correctly', () => {
		const tree = renderer.create(
			<Button />
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	
	it('should render a label');
	it('should render a <TouchableOpacity />');
	
	describe('no type provided', () => {
		it('should have the default style');
	});
	
	describe('primary type', () => {
		it('should have the primary style');
	});
});
```

We just performed a snapshot test! From Facebook's [docs](https://facebook.github.io/jest/docs/en/snapshot-testing.html):

```
Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly.

A typical snapshot test case for a mobile app renders a UI component, takes a screenshot, then compares it to a reference image stored alongside the test. The test will fail if the two images do not match: either the change is unexpected, or the screenshot needs to be updated to the new version of the UI component.
```

Instead of building the GUI, you can serialize the value of your React tree. 

## First test

Next, we will begin to test whether the Button has a <TouchableOpacity />.

In the `__tests__/components/Button.js`:

```
it('should render a <TouchableOpacity />', () => {
	expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
});
```

Run the test with `npm test`, and see the failure!

You should see that the expected length is 1, and the received length is 0.

## Why is it important to watch the test fail?!

Sometimes, tests are false positives. It means that tests says it passes, but the tests don't work. 

## Write the code

```
const Button = () => (
   <TouchableOpacity />
);
```

The test should pass now!

Let's continue to iterate through the TDD cycle through the rest of the specs. We should get to this point..

## Finishing the tests for Button

```
'use strict';

import 'react-native';
import React from 'react';
import Button, {
  styles,
} from '../../app/components/Button';

import renderer from 'react-test-renderer';
import {
  shallow,
} from 'enzyme';

// create test props
const createTestProps = () => ({
  onClick: () => {},
  label: 'Submit',
  type: 'default',
});

describe('<Button />', () => {

  let wrapper;

  describe('rendering', () => {

    // run before each test
    beforeEach(() => {
      wrapper = shallow(<Button { ...createTestProps() } />);
    });

    it('renders correctly', () => {
      const tree = renderer.create(<Button {...createTestProps() } />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render a label', () => {
      expect(wrapper.find('Text').contains('Submit')).toBe(true);
    });

    it('should render a <TouchableOpacity />', () => {
      expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
    });

    describe('no type', () => {
      it('should have the default style', () => {
        expect(wrapper.find('TouchableOpacity').prop('style')).toBe(styles.default);
      });
    });

    describe('primary type', () => {

      // run before each test
      beforeEach(() => {
        wrapper = shallow(<Button
          label='Submit'
          type='primary'
          />);
      });

      it('should have the primary style', () => {
        expect(wrapper.find('TouchableOpacity').prop('style')).toBe(
          styles.primary
        );
      });

    });
  });

  describe('interaction', () => {
    let wrapper;
    let props;

    beforeEach(() => {
      props = {
        label: 'Submit',
        onClick: jest.fn(), // spy: wrapper around normal function to inspect how many times it was called
      };

      wrapper = shallow(<Button { ...props } />);
    });

    describe('clicking the button', () => {
      beforeEach(() => {
        wrapper.find('TouchableOpacity').prop('onPress')();
      });

      it('should call the onClick callback', () => {
        expect(props.onClick).toHaveBeenCalledTimes(1);
      });

    });
  });
});
```

## Complete Button code:

```
'use strict'

import React, { Component } from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types';

// export styles
export const styles = StyleSheet.create({
  default: {
    backgroundColor: 'papayawhip',
  },
  primary: {
    backgroundColor: 'pink',
  },
});

const Button = ({
  label,
  type,
  onClick,
}) => (
  <TouchableOpacity style={ styles[type] } onPress={ onClick }>
    <Text>
      { label }
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'primary']).isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  label: 'Submit',
  type: 'default',
  onClick: () => {},
};

Button.displayName = 'Button';

export default Button;
```

## RDD a TextBox

Here is a new TextBox component. We will build out this button:

```
describe('<TextBox />', () => {
  describe('rendering', () => {

    // snapshot
    it('renders correctly');

    it('should render TextInput');

    it('should have default styling');

    describe('primary styles', () => {
      it('should have primary style');
    });

  });

  describe('interactions', () => {
    it('should have a blank initial state');
    it('should be able to change the value based on typing');
    it('should change the state when the input changes')
  });

});
```

Let's do the same TDD. Try it on your own, and then check your [answer](https://github.com/scy-edu/react-component-testing/blob/master/__tests__/components/TextBox.js) against [ours](https://github.com/scy-edu/react-component-testing/blob/master/app/components/TextBox.js).

## Testing Redux

Now that we have a firm grasp of testing our components, let's create a Redux state for our app!


*What is Redux?*

**[Redux](https://redux.js.org/) is a predictable state container for JavaScript apps.**

It is the standard for most React application to keep track of the global state.

Let's start by creating our constants: 

```
'use strict';

import keyMirror from 'keymirror';

const types = keyMirror({
    ADD_TODO: null,
    DELETE_TODO: null,
});

export default types;
```

And create our simple & empty synchronous action creators:

```
'use strict';

import types from '../constants';

export function addTodo() {}

export function deleteTodo() {} 
```

Let's RDD:

```
"use strict";

import * as actions from '../../app/actions/todos';
import types from '../../app/constants';

describe('todos actions', () => {
    it('has an action to add todos');
    it('has an action to delete todos');
});
```

Test the add todo action creator:

```
it('has an action to add todos', () => {
    const text = 'Finish creating lesson';
    const expectedAction = {
        type: types.ADD_TODO,
        text,
    };

    expect(actions.addTodo(text)).toEqual(expectedAction);
});
```

Run the test, it should fail!

Then, let's get it passing:

```
export function addTodo(text) {
    return {
        type: types.ADD_TODO,
        text,
    }
}
```

Finish the delete todo action creator:

```
it('has an action to delete todos', () => {
    const index = 1;
    const expectedAction = {
        type: types.DELETE_TODO,
        index,
    };

    expect(actions.deleteTodo(index)).toEqual(expectedAction);
});
```

Run the test, it should fail!

Then, let's get it passing:

```
export function deleteTodo(index) {
    return {
        type: types.DELETE_TODO,
        index,
    };
} 
```

Simple, right? Synchronous actions are easy.

## Testing Asynchronous action

Add these new action types:

```
...

const types = keyMirror({
    ADD_TODO: null,
    DELETE_TODO: null,

    // get todos
    FETCH_TODOS_REQUEST: null,
    FETCH_TODOS_SUCCESS: null,
    FETCH_TODOS_FAILURE: null,
});
```

Add the asynchronous action creators:

```
...

function fetchTodosSuccess() {}

function fetchTodosFailure() {}

function fetchTodosRequest() {}

export function fetchTodos() {}
```

## Creating our first Mock

According to the [docs](https://facebook.github.io/jest/docs/en/manual-mocks.html): *Manual mocks are used to stub out functionality with mock data. For example, instead of accessing a remote resource like a website or a database, you might want to create a manual mock that allows you to use fake data. This ensures your tests will be fast and not flaky.*

We will create a `__mocks__` directory and add a `redux-mock-store.js` file:

```
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
```

Then, let's write the test for our async action creators:

```
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
```

Run the tests, they should fail!

Then, let's get everything working:

```
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
```

Boom! And that's how you test async action creators.

## Testing Reducers

Start off with a blank reducer:

```
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
            return state;
        case types.DELETE_TODO:
            return state;
        case types.FETCH_TODOS_SUCCESS:
            return state;
        default:
            return state;
    }
}
```

RDD the reducers:

```
'use strict';

import todosReducer, {
    initialState,
} from '../../app/reducers/todosReducer';
import types from '../../app/constants';

describe('todos reducer', () => {
    it('should return the initial state');

    it('should handle ADD_TODO');

    it('should handle DELETE_TODO');

    it('should handle FETCH_TODOS'););
});
```

Write the tests:

```
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
```

They should fail!

Write the code:

```
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
```

Now, your tests should pass!

You have completed the basics of React Native testing. You can now go forth and write confident and bug-free code :)



