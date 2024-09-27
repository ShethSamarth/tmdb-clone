import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from '../icon';

import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface OverviewProps {
  rating: number;
  overview: string;
}

const Overview = ({rating, overview}: OverviewProps) => {
  return (
    <View style={styles.overview}>
      <View style={styles.overviewHeader}>
        <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>Overview</Text>
        <Text style={[DYNAMIC.h4(FONTS.ibm, COLORS.primary), styles.shrink]}>
          <Icon name="star-filled" size={18} />
          {(Math.round(rating * 100) / 100).toFixed(1)}
        </Text>
      </View>
      <Text style={DYNAMIC.bodySmall(FONTS.ibm, COLORS.gray700)}>
        {overview}
      </Text>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  overview: {
    paddingVertical: 20,
    rowGap: 10,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shrink: {
    flexShrink: 0,
  },
});
