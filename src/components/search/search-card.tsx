import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import Icon from '../icon';

import {useGetGenre} from '../../api/movies/use-get-genre';

import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface SearchCardProps {
  id: number;
  route: string;
  name: string;
  poster: string;
  rating?: number;
  genre_ids: number[];
}

const SearchCard = ({
  id,
  route,
  name,
  poster,
  rating,
  genre_ids,
}: SearchCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const {data: genres, isLoading: genreLoading} = useGetGenre();

  const getGenre = (genre_id: number) => {
    return genres.genres.find((item: any) => item.id === genre_id)?.name || '';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push(route, {id})}>
      <Image
        style={styles.poster}
        source={{
          uri: `https://image.tmdb.org/t/p/original${poster}`,
        }}
      />
      <View style={styles.flex}>
        <View style={styles.top}>
          <Text
            style={[DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary), styles.w70]}>
            {name}
          </Text>

          {!!rating && (
            <Text
              style={[
                DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary),
                styles.shrink,
              ]}>
              <Icon name="star-filled" size={18} />
              {(Math.round(rating! * 100) / 100).toFixed(1)}
            </Text>
          )}
        </View>
        <View style={styles.genres}>
          {!genreLoading &&
            genre_ids.map(genre_id => {
              if (getGenre(genre_id)) {
                return (
                  <Text key={genre_id} style={styles.genre}>
                    {getGenre(genre_id)}
                  </Text>
                );
              }
            })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.gray200,
  },
  poster: {
    width: '33%',
    aspectRatio: 0.7,
    objectFit: 'cover',
    borderRadius: 8,
    backgroundColor: COLORS.gray200,
  },
  flex: {
    flex: 1,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  w70: {
    width: '70%',
  },
  shrink: {
    flexShrink: 0,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
