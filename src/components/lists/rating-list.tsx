import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Icon from '../icon';
import Header from './header';

import {useGetGenre} from '../../api/movies/use-get-genre';

import {ViewAllStoreType} from '../../stores/view-all-store';

import {Movie} from '../../../types';
import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface RatingListProps {
  title: string;
  data: Movie[];
  ViewAllStore?: ViewAllStoreType;
}

const RatingList = inject('ViewAllStore')(
  observer(({title, data, ViewAllStore}: RatingListProps) => {
    const {width} = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const {data: genres, isLoading: genreLoading} = useGetGenre();

    const getGenre = (id: number) => {
      return genres.genres.find((item: any) => item.id === id)?.name || '';
    };

    const onViewAll = () => {
      ViewAllStore?.setPageTitle(title);
      ViewAllStore?.setData(data);
      navigation.push('ViewAll');
    };

    return (
      <View style={styles.container}>
        <Header title={title} onViewAll={onViewAll} />
        <FlatList
          horizontal
          data={data.slice(0, 5)}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[styles.card, {width: width / 1.8}]}
              onPress={() => navigation.push('MoviePreview', {id: item.id})}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
                }}
                style={styles.poster}
              />
              <View style={styles.details}>
                <View style={styles.top}>
                  <Text
                    style={[
                      DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary),
                      styles.title,
                    ]}>
                    {item.original_title}
                  </Text>
                  <Text style={DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary)}>
                    <Icon name="star-filled" size={18} />
                    {(Math.round(item.vote_average * 100) / 100).toFixed(1)}
                  </Text>
                </View>
                {!genreLoading && (
                  <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.primary)}>
                    {item.genre_ids.map((id, index) => {
                      if (getGenre(id)) {
                        if (index === 0) {
                          return getGenre(id);
                        } else {
                          return `, ${getGenre(id)}`;
                        }
                      }
                    })}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }),
);

export default RatingList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    rowGap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  list: {
    paddingHorizontal: 24,
    columnGap: 12,
  },
  card: {
    rowGap: 4,
    borderRadius: 8,
    backgroundColor: '#F2F4F7',
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    aspectRatio: 1.88,
    objectFit: 'cover',
  },
  details: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
});
