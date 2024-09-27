import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Movie} from '../../types';
import {COLORS, DYNAMIC, FONTS} from '../constants';
import CardsList from './lists/cards-list';

interface PersonDetailsProps {
  overview: string;
  name: string;
  knownFor: string;
  birthPlace: string;
  dob: string;
  movies: Movie[];
}

const PersonDetails = ({
  overview,
  name,
  knownFor,
  birthPlace,
  dob,
  movies,
}: PersonDetailsProps) => {
  return (
    <View style={styles.container}>
      {overview && (
        <View style={styles.sectionContainer}>
          <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>Overview</Text>
          <Text style={styles.pt16}>{overview}</Text>
        </View>
      )}

      <View style={styles.sectionContainer}>
        <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>Information</Text>

        <View style={styles.infoRow}>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Name
            </Text>
            <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>{name}</Text>
          </View>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Known For
            </Text>
            <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>
              {knownFor}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Birth Place
            </Text>
            <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>
              {birthPlace}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Date of Birth
            </Text>
            <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>{dob}</Text>
          </View>
        </View>
      </View>

      <View style={styles.pv16}>
        <CardsList title="Movies" data={movies} />
      </View>
    </View>
  );
};

export default PersonDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray100,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  sectionContainer: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  pt16: {
    paddingTop: 16,
    color: COLORS.gray700,
  },
  pv16: {
    paddingVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 16,
  },
  info: {
    flex: 1,
  },
});
