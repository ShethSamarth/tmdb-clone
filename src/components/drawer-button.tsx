import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS, FONTS} from '../constants';

interface DrawerButtonProps {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  arrow?: boolean;
}

const DrawerButton = ({
  label,
  icon,
  onPress,
  arrow = true,
}: DrawerButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.left}>
        {icon}
        <Text style={styles.text}>{label}</Text>
      </View>
      {arrow && (
        <Ionicon size={20} color={COLORS.white} name="chevron-forward" />
      )}
    </TouchableOpacity>
  );
};

export default DrawerButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 18,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  text: {
    fontFamily: FONTS.ibm,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.white,
  },
});
