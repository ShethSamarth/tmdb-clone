import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import TvCardsList from '../lists/tv-cards-list';

import {TvShow} from '../../../types';
import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface SeasonsProps {
  id: number;
  backdrop_path: string;
  poster_path: string;
  number_of_seasons: number;
  status: string;
  language: string;
  network: string;
  type: string;
  recommendation: TvShow[];
}

const Seasons = ({
  id,
  backdrop_path,
  poster_path,
  number_of_seasons,
  status,
  language,
  network,
  type,
  recommendation,
}: SeasonsProps) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      {number_of_seasons > 1 && (
        <View style={styles.sectionContainer}>
          <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>Seasons</Text>
          <TouchableOpacity
            style={styles.collection}
            onPress={() =>
              navigation.push('Seasons', {id, backdrop_path, number_of_seasons})
            }>
            <View style={styles.leftCollection}>
              <Image
                style={[styles.collectionImg, {width: width / 6}]}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${poster_path}`,
                }}
              />
              <Text style={[DYNAMIC.h4(FONTS.ibm, COLORS.primary)]}>
                Season (1 to {number_of_seasons})
              </Text>
            </View>
            <IonIcon size={22} color={COLORS.primary} name="chevron-forward" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.sectionContainer}>
        <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>Information</Text>

        <View style={styles.infoRow}>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Status
            </Text>
            <Text style={DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary)}>
              {status}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Original Language
            </Text>
            <Text style={DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary)}>
              {language}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Network
            </Text>
            <Text style={DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary)}>
              {network}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Type
            </Text>
            <Text style={DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary)}>
              {type}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.pv}>
        <TvCardsList maxItems={10} title="Recommended" data={recommendation} />
      </View>
    </View>
  );
};

export default Seasons;

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
  collection: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 24,
  },
  leftCollection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectionImg: {
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 6,
    marginEnd: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 16,
  },
  info: {
    flex: 1,
  },
  pv: {
    paddingVertical: 24,
  },
});
