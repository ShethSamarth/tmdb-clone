import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';

import CardsList from '../../components/lists/cards-list';
import RatingList from '../../components/lists/rating-list';
import CarouselList from '../../components/lists/carousel-list';

import {useGetPopular} from '../../api/movies/use-get-popular';
import {useGetTrending} from '../../api/movies/use-get-trending';
import {useGetUpcoming} from '../../api/movies/use-get-upcoming';
import {useGetTopRated} from '../../api/movies/use-get-top-rated';
import {useGetNowPlaying} from '../../api/movies/use-get-now-playing';

import {COLORS} from '../../constants';

const Movies = () => {
  const {
    data: popular,
    isLoading: popularLoading,
    isFetching: popularFetching,
    refetch: refetchpopular,
  } = useGetPopular();
  const {
    data: nowPlaying,
    isLoading: nowPlayingLoading,
    isFetching: nowPlayingFetching,
    refetch: refetchnowPlaying,
  } = useGetNowPlaying();
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
  const {
    data: upcoming,
    isLoading: upcomingLoading,
    isFetching: upcomingFetching,
    refetch: refetchupcoming,
  } = useGetUpcoming();

  if (
    popularLoading ||
    nowPlayingLoading ||
    trendingLoading ||
    upcomingLoading ||
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
    refetchpopular();
    refetchnowPlaying();
    refetchtrending();
    refetchtoprated();
    refetchupcoming();
  };

  const refreshing =
    popularFetching ||
    nowPlayingFetching ||
    trendingFetching ||
    topratedFetching ||
    upcomingFetching;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <CardsList title="What's Popular" data={popular.results} />
      <CarouselList title="Playing In Theaters" data={nowPlaying} />
      <CardsList title="Trending" data={trending.results} />
      <RatingList title="Top Rated" data={toprated.results} />
      <CardsList title="Upcomming" data={upcoming.results} />
    </ScrollView>
  );
};

export default Movies;

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
