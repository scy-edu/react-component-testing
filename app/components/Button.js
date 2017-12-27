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
