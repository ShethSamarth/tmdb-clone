import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import Input from '../components/input';
import SearchResults from '../components/search/search-results';
import SearchTrending from '../components/search/search-trending';

import {axiosAuth} from '../lib/axios';

import {COLORS, DYNAMIC, ENV, FONTS} from '../constants';

const Search = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getSearchResults = async () => {
      if (!search) {
        setData([]);
        return;
      }

      try {
        const res = await axiosAuth.get(
          `${ENV.apiUrl}/search/multi?query=${search}&language=en-IN&page=1`,
        );

        setPage(res.data.page);
        setTotalPages(res.data.total_pages);

        setData(res.data.results);
      } catch {
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    const getData = setTimeout(() => getSearchResults(), 2000);

    return () => clearTimeout(getData);
  }, [search]);

  const onEndReached = async () => {
    setIsFetching(true);
    if (totalPages <= page) {
      return;
    }

    try {
      const res = await axiosAuth.get(
        `${ENV.apiUrl}/search/multi?query=${search}&language=en-IN&page=${
          page + 1
        }`,
      );

      setPage(res.data.page);
      setTotalPages(res.data.total_pages);

      setData(prev => [...prev, ...res.data.results]);
    } catch {
      setData(prev => prev);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <AntDesignIcon
          size={24}
          name="arrowleft"
          color={COLORS.primary}
          onPress={navigation.goBack}
        />
      </View>

      <Input
        search
        rounded
        placeholder="Search"
        value={search}
        onChangeText={e => {
          setPage(1);
          setSearch(e);
        }}
      />

      {!search ? (
        <SearchTrending />
      ) : isLoading ? (
        <ActivityIndicator
          size={40}
          color={COLORS.primary}
          style={styles.center}
        />
      ) : data.length === 0 ? (
        <Text
          style={[
            DYNAMIC.h4(FONTS.ibm, COLORS.primary, 'center'),
            styles.center,
          ]}>
          No results found
        </Text>
      ) : (
        <>
          <SearchResults data={data} onEndReached={onEndReached} />
          {isFetching && <ActivityIndicator size={20} color={COLORS.primary} />}
        </>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingBottom: 24,
    rowGap: 10,
  },
  back: {
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  center: {
    flex: 1,
    textAlignVertical: 'center',
  },
  paginationContainer: {
    columnGap: 10,
    height: 45,
  },
});
