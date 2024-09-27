import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import PersonCard from '../../components/credits/person-card';
import TabButtons, {TabButtonType} from '../../components/credits/tab-buttons';

import {useGetPopular} from '../../api/person/use-get-popular';
import {useGetTrending} from '../../api/person/use-get-trending';

import {COLORS} from '../../constants';

export enum CreditsTab {
  Popular,
  Trending,
}

const People = () => {
  const {width} = useWindowDimensions();

  const [selectedTab, setSelectedTab] = useState<CreditsTab>(
    CreditsTab.Popular,
  );

  const buttons: TabButtonType[] = [{title: 'Popular'}, {title: 'Trending'}];

  const {
    data: popular,
    isLoading: popularLoading,
    isFetching: popularFetching,
    refetch: popularRefetch,
  } = useGetPopular();
  const {
    data: trending,
    isLoading: trendingLoading,
    isFetching: trendingFetching,
    refetch: trendingRefetch,
  } = useGetTrending();

  if (popularLoading || trendingLoading) {
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
      <TabButtons
        buttons={buttons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      {selectedTab === 0 ? (
        <FlatList
          key={width}
          data={popular}
          numColumns={width > 500 ? 3 : 2}
          columnWrapperStyle={styles.column}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={popularFetching}
              onRefresh={popularRefetch}
            />
          }
          renderItem={({item}) => (
            <PersonCard
              key={item.id}
              id={item.id}
              image={item.profile_path}
              name={item.original_name}
              work={item.known_for_department}
            />
          )}
        />
      ) : (
        <FlatList
          key={width}
          data={trending}
          numColumns={width > 500 ? 3 : 2}
          columnWrapperStyle={styles.column}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={trendingFetching}
              onRefresh={trendingRefetch}
            />
          }
          renderItem={({item}) => (
            <PersonCard
              key={item.id}
              id={item.id}
              image={item.profile_path}
              name={item.original_name}
              work={item.known_for_department}
            />
          )}
        />
      )}
    </View>
  );
};

export default People;

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
  },
  scrollContainer: {
    padding: 24,
    rowGap: 15,
  },
  column: {
    columnGap: 15,
  },
});
