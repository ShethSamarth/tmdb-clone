import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Genre} from '../../../types';
import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface TitleProps {
  title: string;
  genres: Genre[];
}

const Title = ({title, genres}: TitleProps) => {
  return (
    <>
      <Text style={DYNAMIC.h3(FONTS.ibm, COLORS.primary)}>{title}</Text>
      <View style={styles.genres}>
        {genres.map(({id, name}) => (
          <Text key={id} style={styles.genre}>
            {name}
          </Text>
        ))}
      </View>
    </>
  );
};

export default Title;

const styles = StyleSheet.create({
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
  },
  genre: {
    backgroundColor: COLORS.gray100,
    fontFamily: FONTS.ibm,
    fontSize: 14,
    color: COLORS.secondary,
    borderRadius: 20,
    margin: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});
