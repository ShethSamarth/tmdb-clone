import React from 'react';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import Title from '../components/movie-preview/title';
import Trailer from '../components/movie-preview/trailer';
import CreditsList from '../components/lists/credits-list';
import Overview from '../components/movie-preview/overview';
import Provider from '../components/movie-preview/provider';
import Seasons from '../components/tv-show-preview/seasons';

import {useGetVideos} from '../api/tv-shows/use-get-videos';
import {useGetTvShow} from '../api/tv-shows/use-get-tv-show';
import {useGetCredits} from '../api/tv-shows/use-get-credits';
import {useGetProviders} from '../api/tv-shows/use-get-providers';
import {useGetRecommendation} from '../api/tv-shows/use-get-recommendation';

import {AuthStoreType} from '../stores/auth-store';

import {COLORS} from '../constants';
import Header from '../components/tv-show-preview/header';

type ParamList = {
  MoviePreview: {
    id: number;
  };
};

const TvShowPreview = inject('AuthStore')(
  observer(({AuthStore}: {AuthStore?: AuthStoreType}) => {
    const {params} = useRoute<RouteProp<ParamList, 'MoviePreview'>>();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    if (!params?.id) {
      navigation.goBack();
    }

    const {data, isLoading: dataloading} = useGetTvShow(params.id);
    const {data: videos, isLoading: videosloading} = useGetVideos(params.id);
    const {data: providers, isLoading: providersLoading} = useGetProviders(
      params.id,
    );
    const {data: credits, isLoading: creditsLoading} = useGetCredits(params.id);
    const {data: recommendation, isLoading: recommendationLoading} =
      useGetRecommendation(params.id);

    if (
      dataloading ||
      videosloading ||
      providersLoading ||
      creditsLoading ||
      recommendationLoading
    ) {
      return (
        <ActivityIndicator
          size={40}
          style={styles.loader}
          color={COLORS.primary}
        />
      );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Header
          media_id={params.id}
          poster={data?.poster_path!}
          title={data?.original_name!}
          isGuest={AuthStore?.isGuest!}
          session_id={AuthStore?.session_id!}
        />

        <View style={styles.innerContainer}>
          <Title title={data!.original_name} genres={data!.genres} />

          {videos && videos[0]?.key && (
            <Trailer
              videoKey={videos![0].key}
              backdrop_path={data!.backdrop_path}
            />
          )}

          {providers?.link &&
            providers.buy &&
            providers.buy[0] &&
            providers.buy[0].logo_path && (
              <Provider
                link={providers.link}
                logo_path={providers.buy[0].logo_path}
              />
            )}

          <Overview rating={data!.vote_average} overview={data!.overview} />
        </View>

        {credits?.crew && credits.crew.length > 0 && (
          <CreditsList cast={credits?.cast} crew={credits?.crew} />
        )}

        <Seasons
          id={data!.id}
          backdrop_path={data!.backdrop_path}
          poster_path={data!.poster_path}
          number_of_seasons={data!.number_of_seasons}
          status={data!.status}
          language={data!.spoken_languages[0].english_name}
          network={data!.networks.map(item => item.name).join(', ')}
          type={data!.type}
          recommendation={recommendation!}
        />
      </ScrollView>
    );
  }),
);

export default TvShowPreview;

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
  innerContainer: {
    paddingHorizontal: 24,
  },
});
