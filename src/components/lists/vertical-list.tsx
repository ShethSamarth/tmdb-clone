import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Icon from '../icon';

import {useGetGenre} from '../../api/movies/use-get-genre';

import {Movie} from '../../../types';
import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface VerticalListProps {
  data: Movie[];
  scrollEnabled?: boolean;
  refetch?: () => void;
}

const VerticalList = ({
  data,
  scrollEnabled = true,
  refetch,
}: VerticalListProps) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    if (refetch && isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  const {data: genres, isLoading: genreLoading} = useGetGenre();

  const getGenre = (id: number) => {
    return genres.genres.find((item: any) => item.id === id)?.name || '';
  };

  return (
    <FlatList
      data={data}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.push('MoviePreview', {id: item.id})}>
          <Image
            style={styles.poster}
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            }}
          />
          <View style={styles.flex}>
            <View style={styles.top}>
              <Text
                style={[
                  DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary),
                  styles.w70,
                ]}>
                {item.original_title}
              </Text>
              <Text
                style={[
                  DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary),
                  styles.shrink,
                ]}>
                <Icon name="star-filled" size={18} />
                {(Math.round(item.vote_average * 100) / 100).toFixed(1)}
              </Text>
            </View>
            <View style={styles.genres}>
              {!genreLoading &&
                item.genre_ids.map(id => {
                  if (getGenre(id)) {
                    return (
                      <Text key={id} style={styles.genre}>
                        {getGenre(id)}
                      </Text>
                    );
                  }
                })}
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default VerticalList;

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
  },
  flex: {
    flex: 1,
  },
  w70: {
    width: '70%',
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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