'use strict';

import {
  TextInput,
} from 'react-native';
import React from 'react';
import TextBox, {
  style,
} from '../../app/components/TextBox';

import renderer from 'react-test-renderer';
import {
  shallow,
} from 'enzyme';

// create test props
const createTestProps = () => ({
  type: 'default',
});

describe('<TextBox />', () => {
  describe('rendering', () => {

    let wrapper,
        props = createTestProps();

    beforeEach(() => {
      wrapper = shallow(<TextBox { ...props } />);
    });

    // snapshot
    it('renders correctly', () => {
      const tree = renderer.create(
        <TextBox { ...props } />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render TextInput', () => {
      expect(wrapper.find('TextInput')).toHaveLength(1);
      expect(wrapper.type()).toBe(TextInput);
    });

    it('should have default styling', () => {
      expect(wrapper.find('TextInput').prop('style')).toBe(style.default);
    });

    describe('primary styles', () => {
      beforeEach(() => {
        wrapper = shallow(
          <TextBox type='primary' />
        );
      });

      it('should have primary style', () => {
        expect(wrapper.find('TextInput').prop('style')).toBe(style.primary);
      });

    });

  });

  describe('interactions', () => {
    let wrapper,
        props = createTestProps(),
        newValue = 'Hello world';

    beforeEach(() => {
      wrapper = shallow(
        <TextBox { ...props } />
      );
    });

    it('should have a blank initial state', () => {
      expect(wrapper.state('value')).toBe('');
    });

    it('should be able to change the value based on typing', () => {
      wrapper.setState({
        value: newValue,
      });

      expect(wrapper.state('value')).toBe(newValue);
    });

    it('should change the state when the input changes', () => {
      wrapper.simulate('change', newValue);
      expect(wrapper.state('value')).toBe(newValue);
    });
  });

});
