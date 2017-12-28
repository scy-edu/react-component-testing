'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  TextInput,
  StyleSheet,
} from 'react-native'

export const style = StyleSheet.create({
  default: {
    backgroundColor: 'grey',
  },
  primary: {
    backgroundColor: 'blue',
  },
});

export default class TextBox extends Component {
  state = {
    value: '',
  };

  _onChange = (value) => {
    this.setState({
      value
    });
  };

  render() {
    const {
      type,
    } = this.props;

    const {
      value,
    } = this.state;

    return (
      <TextInput
        onChange={ this._onChange }
        style={ style[type] }
        value={ value } />
    );
  }

};

TextBox.propTypes = {
  type: PropTypes.oneOf(['default', 'primary']).isRequired,
};

TextBox.defaultProps = {
  type: 'default',
};

// debugging purposes
TextBox.displayName = 'TextBox'
