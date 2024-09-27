import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {useGetPopular} from '../../api/tv-shows/use-get-popular';
import {useGetTrending} from '../../api/tv-shows/use-get-trending';
import {useGetTopRated} from '../../api/tv-shows/use-get-top-rated';
import {useGetNowAiring} from '../../api/tv-shows/use-get-now-airing';

import TvCardsList from '../../components/lists/tv-cards-list';
import TvRatingList from '../../components/lists/tv-rating-list';
import TvCarouselList from '../../components/lists/tv-carousel-list';

import {COLORS} from '../../constants';

const TvShows = () => {
  const {
    data: nowAiring,
    isLoading: nowAiringLoading,
    isFetching: nowAiringFetching,
    refetch: refetchnowAiring,
  } = useGetNowAiring();
  const {
    data: popular,
    isLoading: popularLoading,
    isFetching: popularFetching,
    refetch: refetchpopular,
  } = useGetPopular();
  const {
    data: trending,
    isLoading: trendingLoading,
    isFetching: trendingFetching,
    refetch: refetchtrending,
  } = useGetTrending();
  const {
    data: toprated,
    isLoading: topratedLoading,
    isFetching: topratedFetching,
    refetch: refetchtoprated,
  } = useGetTopRated();

  if (
    nowAiringLoading ||
    popularLoading ||
    trendingLoading ||
    topratedLoading
  ) {
    return (
      <ActivityIndicator
        size={40}
        style={styles.loader}
        color={COLORS.primary}
      />
    );
  }

  const onRefresh = async () => {
    refetchnowAiring();
    refetchpopular();
    refetchtrending();
    refetchtoprated();
  };

  const refreshing =
    nowAiringFetching ||
    popularFetching ||
    trendingFetching ||
    topratedFetching;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <TvCarouselList title="Airing Today" data={nowAiring!} />
      <TvCardsList title="What's Popular" data={popular!} />
      <TvCardsList title="Trending" data={trending!} />
      <TvRatingList title="Top Rated" data={toprated!} />
    </ScrollView>
  );
};

export default TvShows;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  container: {
    backgroundColor: COLORS.white,
    minHeight: '100%',
  },
});
