import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import CardsList from '../lists/cards-list';

import {Movie} from '../../../types';
import {COLORS, DYNAMIC, FONTS} from '../../constants';
import VideoCarousel from './video-carousel';

interface CollectionProps {
  collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  status: string;
  language: string;
  budget: number;
  revenue: number;
  videos?: {
    name: string;
    key: string;
    site: string;
    type: string;
  }[];
  backdrop_path: string;
  recommendation: Movie[];
}

const Collection = ({
  collection,
  status,
  language,
  budget,
  revenue,
  videos,
  backdrop_path,
  recommendation,
}: CollectionProps) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      {collection !== null && (
        <View style={styles.sectionContainer}>
          <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>Collection</Text>
          <TouchableOpacity
            style={styles.collection}
            onPress={() =>
              navigation.push('CollectionPreview', {id: collection.id})
            }>
            <View style={styles.leftCollection}>
              <Image
                style={[styles.collectionImg, {width: width / 6}]}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${collection?.poster_path}`,
                }}
              />
              <Text style={[DYNAMIC.h4(FONTS.ibm, COLORS.primary)]}>
                {collection?.name}
              </Text>
            </View>
            <IonIcon size={22} color={COLORS.primary} name="chevron-forward" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.sectionContainer}>
        <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>Information</Text>

        <View style={styles.infoRow}>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Status
            </Text>
            <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>{status}</Text>
          </View>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Original Language
            </Text>
            <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>
              {language}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Budget
            </Text>
            <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>${budget}</Text>
          </View>
          <View style={styles.info}>
            <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray700)}>
              Revenue
            </Text>
            <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>
              ${revenue}
            </Text>
          </View>
        </View>
      </View>

      {videos && videos.length > 1 && (
        <View style={styles.videosContainer}>
          <Text style={[DYNAMIC.h4(FONTS.ibm, COLORS.primary), styles.ph]}>
            Videos
          </Text>

          <VideoCarousel backdrop_path={backdrop_path} data={videos} />
        </View>
      )}

      <View style={styles.pv}>
        <CardsList maxItems={10} title="Recommended" data={recommendation} />
      </View>
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray100,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  sectionContainer: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  collection: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 24,
  },
  leftCollection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectionImg: {
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 6,
    marginEnd: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 16,
  },
  info: {
    flex: 1,
  },
  videosContainer: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  ph: {
    paddingHorizontal: 24,
  },
  pv: {
    paddingVertical: 24,
  },
});
