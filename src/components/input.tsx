import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Icon from './icon';
import {COLORS} from '../constants';

interface InputProps extends TextInputProps {
  error?: string;
  isPassword?: boolean;
  rounded?: boolean;
  search?: boolean;
}

const Input = ({
  error,
  isPassword,
  rounded,
  search = false,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={[styles.input, rounded && styles.rounded]}>
            {search && <Icon size={20} name="search" color={COLORS.gray500} />}

            <TextInput
              {...props}
              style={styles.flex}
              placeholderTextColor={COLORS.gray500}
              secureTextEntry={isPassword && !showPassword}
              keyboardType={showPassword ? 'visible-password' : 'default'}
            />
            {isPassword && (
              <Icon
                size={24}
                style={styles.eyeBtn}
                color={COLORS.gray500}
                name={showPassword ? 'eye' : 'eye-slash'}
                onPress={() => setShowPassword(!showPassword)}
              />
            )}
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    lineHeight: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  flex: {
    flex: 1,
    color: COLORS.gray800,
  },
  rounded: {
    borderRadius: 50,
  },
  eyeBtn: {
    position: 'absolute',
    top: 12,
    right: 15,
    color: COLORS.gray500,
  },
  error: {
    color: COLORS.red,
  },
});
