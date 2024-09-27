import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface HeaderProps {
  title: string;
  onViewAll: () => void;
}

const Header = ({title, onViewAll}: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>{title}</Text>
      <Text
        onPress={onViewAll}
        style={DYNAMIC.bodySmall(FONTS.ibm, COLORS.secondary)}>
        View All <EntypoIcon name="chevron-thin-right" size={10} />
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
});
