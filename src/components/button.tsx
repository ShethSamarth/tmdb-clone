import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

import {COLORS, FONTS} from '../constants';

interface ButtonProps extends TouchableOpacityProps {}

const Button = ({children, disabled, style, ...props}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[styles.btn, disabled && styles.disabled, style]}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: FONTS.ibm,
  },
});
