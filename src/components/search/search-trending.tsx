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
import {useNavigation} from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useGetTrending} from '../../api/movies/use-get-trending';

import {COLORS, DYNAMIC, FONTS} from '../../constants';

const SearchTrending = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const {data, isLoading} = useGetTrending();

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.pv10}>
      <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>
        <FeatherIcon size={20} name="trending-up" />
        {'  '}
        Trending
      </Text>

      <FlatList
        scrollEnabled={false}
        data={data.results.slice(0, 5)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.push('MoviePreview', {id: item.id})}>
            <View style={[styles.left, {maxWidth: width / 1.5}]}>
              <Image
                style={[styles.poster, {width: width / 3}]}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
                }}
              />
              <Text
                style={[
                  DYNAMIC.bodyLarge(FONTS.ibm, COLORS.primary),
                  styles.title,
                ]}>
                {item.original_title}
              </Text>
            </View>

            <EntypoIcon
              size={20}
              color={COLORS.primary}
              name="chevron-thin-right"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchTrending;

const styles = StyleSheet.create({
  pv10: {
    paddingVertical: 10,
  },
  container: {
    paddingVertical: 15,
    rowGap: 15,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  poster: {
    aspectRatio: 16 / 9,
    borderRadius: 10,
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
