import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import SearchCard from './search-card';

import {SearchResult} from '../../../types';

interface SearchResultsProps {
  data: SearchResult[];
  onEndReached: () => void;
}

const SearchResults = ({data, onEndReached}: SearchResultsProps) => {
  return (
    <FlatList
      data={data}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({item}) => {
        if (item.media_type === 'movie') {
          return (
            <SearchCard
              id={item.id}
              route="MoviePreview"
              name={item.original_title!}
              poster={item.poster_path!}
              rating={item.vote_average}
              genre_ids={item.genre_ids!}
            />
          );
        } else if (item.media_type === 'tv') {
          return (
            <SearchCard
              id={item.id}
              route="TvShowPreview"
              name={item.original_name!}
              poster={item.poster_path!}
              rating={item.vote_average}
              genre_ids={item.genre_ids!}
            />
          );
        } else if (item.media_type === 'person') {
          return (
            <SearchCard
              id={item.id}
              route="PersonPreview"
              name={item.original_name!}
              poster={item.profile_path!}
              rating={item.vote_average}
              genre_ids={[]}
            />
          );
        } else {
          return null;
        }
      }}
    />
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 100,
  },
});
