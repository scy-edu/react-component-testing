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
      const tree = renderer.create(
        <Button label='Send' />
      );
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
