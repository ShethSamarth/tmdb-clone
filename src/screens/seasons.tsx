import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import Episodes from '../components/tv-show-preview/episodes';
import SeasonTabs from '../components/tv-show-preview/season-tabs';

import {COLORS} from '../constants';

type ParamList = {
  Seasons: {
    id: number;
    backdrop_path: string;
    number_of_seasons: number;
  };
};

const Seasons = () => {
  const {width} = useWindowDimensions();

  const {params} = useRoute<RouteProp<ParamList, 'Seasons'>>();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  if (!params?.id) {
    navigation.goBack();
  }

  let scenes = {};

  for (let i = 1; i <= params.number_of_seasons; i++) {
    scenes = {
      [i]: () => Episodes({id: params.id, season: i}),
      ...scenes,
    };
  }

  const routes = Object.keys(scenes).map(key => {
    return {key, title: `Season ${key}`};
  });

  return (
    <ScrollView
      scrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {params.backdrop_path && (
        <Image
          style={[styles.poster, {width: width - 48}]}
          source={{
            uri: `https://image.tmdb.org/t/p/original${params.backdrop_path}`,
          }}
        />
      )}

      <View style={styles.separator} />

      <SeasonTabs routes={routes} scenes={scenes} />
    </ScrollView>
  );
};

export default Seasons;

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: COLORS.white,
    paddingTop: 24,
  },
  poster: {
    maxHeight: 200,
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginHorizontal: 24,
    marginBottom: 25,
    alignSelf: 'center',
  },
  separator: {
    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.gray200,
  },
});
