import React from 'react';
import {
  type GestureResponderEvent,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

import icoMoonConfig from '../../selection.json';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const CustomIcon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'icomoon',
  'icomoon.ttf',
);

const Icon = ({name, size, color, style, onPress}: IconProps) => {
  return (
    <CustomIcon
      name={name}
      style={style}
      size={size}
      color={color}
      onPress={onPress}
    />
  );
};

export default Icon;
