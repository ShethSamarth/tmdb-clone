import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import VerticalList from '../components/lists/vertical-list';

import {useGetCollection} from '../api/collection/use-get-collection';

import {COLORS, DYNAMIC, FONTS} from '../constants';

type ParamList = {
  CollectionPreview: {
    id: number;
  };
};

const CollectionPreview = () => {
  const {params} = useRoute<RouteProp<ParamList, 'CollectionPreview'>>();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  if (!params?.id) {
    navigation.goBack();
  }

  const {data: collection, isLoading: collectionLoading} = useGetCollection(
    params.id,
  );

  if (collectionLoading) {
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
      <Image
        style={styles.poster}
        source={{
          uri: `https://image.tmdb.org/t/p/original${collection?.backdrop_path}`,
        }}
      />
      <Text style={[DYNAMIC.h4(FONTS.ibm, COLORS.primary), styles.title]}>
        This Collection Includes
      </Text>

      <VerticalList data={collection!.parts} scrollEnabled={false} />
    </ScrollView>
  );
};

export default CollectionPreview;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  container: {
    minHeight: '100%',
    backgroundColor: COLORS.white,
    padding: 24,
  },
  poster: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 10,
  },
});
