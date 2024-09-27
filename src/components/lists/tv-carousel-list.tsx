import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import Icon from '../icon';
import Header from './header';

import {TvViewAllStoreType} from '../../stores/tv-view-all-store';

import {TvShow} from '../../../types';
import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface CardsListProps {
  title: string;
  data: TvShow[];
  TvViewAllStore?: TvViewAllStoreType;
}

const TvCarouselList = inject('TvViewAllStore')(
  observer(({title, data, TvViewAllStore}: CardsListProps) => {
    const {width} = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const scrollX = new Animated.Value(0);

    const onScroll = (value: number) => scrollX.setValue(value);

    const onViewAll = () => {
      TvViewAllStore?.setPageTitle(title);
      TvViewAllStore?.setData(data);
      navigation.push('TvViewAll');
    };

    return (
      <View style={styles.container}>
        <Header title={title} onViewAll={onViewAll} />

        <Carousel
          loop
          key={width}
          width={width}
          height={width / 2}
          data={data.slice(0, 5)}
          scrollAnimationDuration={500}
          onSnapToItem={onScroll}
          mode="parallax"
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.relative}
              onPress={() => navigation.push('TvShowPreview', {id: item.id})}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
                }}
                style={styles.poster}
              />
              <View style={styles.filter}>
                <View style={styles.trailerText}>
                  <Icon name="play-circle" size={25} color={COLORS.white} />
                  <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.white)}>
                    Watch Now
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <View style={styles.dotsContainer}>
          {data.slice(0, 5).map((_, i) => {
            const inputRange = [i - 1, i, i + 1];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 30, 10],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={i.toString()}
                style={[styles.dots, {width: dotWidth, opacity}]}
              />
            );
          })}
        </View>
      </View>
    );
  }),
);

export default TvCarouselList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    rowGap: 10,
  },
  relative: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
  },
  filter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trailerText: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dots: {
    height: 10,
    backgroundColor: COLORS.primary,
    margin: 4,
    borderRadius: 30,
  },
});
