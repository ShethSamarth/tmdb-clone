import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import YoutubePlayer, {PLAYER_STATES} from 'react-native-youtube-iframe';

import Icon from '../icon';

import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface TrailerProps {
  videoKey: string;
  backdrop_path: string;
  title?: string;
}

const Trailer = ({
  videoKey,
  backdrop_path,
  title = 'Trailer',
}: TrailerProps) => {
  const {width} = useWindowDimensions();
  const [playing, setPlaying] = useState(false);

  const onChangeState = (e: PLAYER_STATES) => {
    if (e === PLAYER_STATES.ENDED) {
      setPlaying(false);
    } else if (e === PLAYER_STATES.PLAYING) {
      setPlaying(true);
    }
  };

  return (
    <View style={styles.trailer}>
      {playing ? (
        <YoutubePlayer
          key={width}
          play={playing}
          videoId={videoKey}
          height={(width - 48) / 1.5}
          onChangeState={onChangeState}
        />
      ) : (
        <Pressable onPress={() => setPlaying(true)} style={styles.relative}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${backdrop_path}`,
            }}
            style={styles.poster}
          />
          <View style={styles.filter}>
            <View style={styles.trailerText}>
              <Icon name="play-circle" size={25} color={COLORS.white} />
              <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.white)}>
                Watch {title}
              </Text>
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default Trailer;

const styles = StyleSheet.create({
  trailer: {
    width: '100%',
    aspectRatio: 1.77,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.gray400,
    marginVertical: 15,
  },
  relative: {
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  filter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trailerText: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
});
