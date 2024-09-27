import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {Animated, StyleSheet, useWindowDimensions, View} from 'react-native';

import Trailer from './trailer';

import {COLORS} from '../../constants';

interface CardsListProps {
  data: {
    name: string;
    key: string;
    site: string;
    type: string;
  }[];
  backdrop_path: string;
}

const VideoCarousel = ({data, backdrop_path}: CardsListProps) => {
  const {width} = useWindowDimensions();

  const scrollX = new Animated.Value(0);

  const onScroll = (value: number) => scrollX.setValue(value);

  return (
    <>
      <Carousel
        loop
        key={width}
        width={width}
        height={width / 1.8}
        data={data.slice(0, 5)}
        scrollAnimationDuration={500}
        onSnapToItem={onScroll}
        mode="parallax"
        renderItem={({item}) => (
          <Trailer
            title="Now"
            videoKey={item.key}
            backdrop_path={backdrop_path}
          />
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
    </>
  );
};

export default VideoCarousel;

const styles = StyleSheet.create({
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
