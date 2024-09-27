import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from '../icon';

import {useGetEpisodes} from '../../api/tv-shows/use-get-episodes';

import {convertToDate} from '../../lib/utils';
import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface EpisodesProps {
  id: number;
  season: number;
}

const Episodes = ({id, season}: EpisodesProps) => {
  const {data, isLoading} = useGetEpisodes(id, season);

  if (isLoading) {
    return (
      <ActivityIndicator
        size={40}
        style={styles.loader}
        color={COLORS.primary}
      />
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {data?.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image
            style={styles.poster}
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.still_path}`,
            }}
          />

          <View style={styles.flex}>
            <View style={styles.top}>
              <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>
                S{season} E{item.episode_number}
              </Text>
              <Text style={DYNAMIC.bodyLarge(FONTS.ibm, COLORS.gray700)}>
                {convertToDate(item.air_date)}
              </Text>
            </View>

            <Text
              style={[
                DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary),
                styles.shrink,
              ]}>
              <Icon name="star-filled" size={18} />
              {(Math.round(item.vote_average * 100) / 100).toFixed(1)}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Episodes;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  container: {
    padding: 24,
    backgroundColor: COLORS.gray100,
  },
  card: {
    flexDirection: 'row',
    columnGap: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.gray200,
  },
  poster: {
    width: '25%',
    aspectRatio: 0.7,
    objectFit: 'cover',
    borderRadius: 8,
  },
  flex: {flex: 1},
  top: {
    flex: 1,
    flexWrap: 'wrap',
  },
  shrink: {flexShrink: 0},
});
