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
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import Header from './header';

import {convertToDate} from '../../lib/utils';
import {TvViewAllStoreType} from '../../stores/tv-view-all-store';

import {TvShow} from '../../../types';
import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface TvCardsListProps {
  title: string;
  data: TvShow[];
  TvViewAllStore?: TvViewAllStoreType;
  maxItems?: number;
}

const TvCardsList = inject('TvViewAllStore')(
  observer(({title, data, TvViewAllStore, maxItems = 5}: TvCardsListProps) => {
    const {width} = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const onViewAll = () => {
      TvViewAllStore?.setPageTitle(title);
      TvViewAllStore?.setData(data);
      navigation.push('TvViewAll');
    };

    return (
      <View style={styles.container}>
        <Header title={title} onViewAll={onViewAll} />
        <FlatList
          horizontal
          data={data.slice(0, maxItems)}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[styles.card, {width: width / 3.5}]}
              onPress={() => navigation.push('TvShowPreview', {id: item.id})}>
              <Image
                style={styles.poster}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                }}
              />
              <View style={styles.details}>
                <Text style={DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary)}>
                  {item.original_name}
                </Text>
                <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray400)}>
                  {convertToDate(item.first_air_date)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }),
);

export default TvCardsList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    rowGap: 10,
  },
  list: {
    paddingHorizontal: 24,
    columnGap: 12,
  },
  card: {
    rowGap: 4,
  },
  poster: {
    width: '100%',
    aspectRatio: 0.7,
    objectFit: 'cover',
    borderRadius: 4,
  },
  details: {
    paddingRight: 10,
  },
});
