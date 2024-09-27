import React, {useState} from 'react';
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import VerticalList from '../../components/lists/vertical-list';
import TvVerticalList from '../../components/lists/tv-vertical-list';
import TabButtons, {TabButtonType} from '../../components/credits/tab-buttons';

import {useGetFavourites as useGetFavouritesMovies} from '../../api/movies/use-get-favourites';
import {useGetFavourites as useGetFavouritesTvShows} from '../../api/tv-shows/use-get-favourites';

import {AuthStoreType} from '../../stores/auth-store';

import {COLORS, DYNAMIC, FONTS} from '../../constants';

export enum Tabs {
  Movies,
  TvShows,
}

const Favourites = inject('AuthStore')(
  observer(({AuthStore}: {AuthStore?: AuthStoreType}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.Movies);

    const buttons: TabButtonType[] = [{title: 'Movies'}, {title: 'Tv Shows'}];

    const {
      data: movies,
      isLoading: moviesLoading,
      refetch: refetchMovies,
    } = useGetFavouritesMovies(AuthStore?.session_id!);
    const {
      data: tvShows,
      isLoading: tvShowsLoading,
      refetch: refetchTvShows,
    } = useGetFavouritesTvShows(AuthStore?.session_id!);

    if (moviesLoading || tvShowsLoading) {
      return (
        <ActivityIndicator
          size={40}
          style={styles.loader}
          color={COLORS.primary}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesignIcon
            size={24}
            name="arrowleft"
            color={COLORS.primary}
            onPress={navigation.goBack}
          />
          <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>
            My Favourites
          </Text>
          <View />
        </View>

        <TabButtons
          buttons={buttons}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        {selectedTab === 0 ? (
          movies && movies.length > 0 ? (
            <VerticalList data={movies!} refetch={refetchMovies} />
          ) : (
            <Text style={styles.center}>No movies added</Text>
          )
        ) : tvShows && tvShows.length > 0 ? (
          <TvVerticalList data={tvShows!} refetch={refetchTvShows} />
        ) : (
          <Text style={styles.center}>No tv shows added</Text>
        )}
      </View>
    );
  }),
);

export default Favourites;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  center: {
    flex: 1,
    alignSelf: 'center',
    textAlignVertical: 'center',
    color: COLORS.gray300,
  },
});
