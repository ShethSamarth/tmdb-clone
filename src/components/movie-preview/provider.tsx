import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface ProviderProps {
  link: string;
  logo_path: string;
}

const Provider = ({link, logo_path}: ProviderProps) => {
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity
      style={styles.provider}
      onPress={() => Linking.openURL(link)}>
      <Image
        style={[styles.providerLogo, {width: width / 10}]}
        source={{uri: `https://image.tmdb.org/t/p/original${logo_path}`}}
      />
      <Text
        style={[DYNAMIC.h4(FONTS.ibm, COLORS.primary), styles.providerText]}>
        Now Streaming
      </Text>
      <Ionicon size={22} color={COLORS.primary} name="chevron-forward" />
    </TouchableOpacity>
  );
};

export default Provider;

const styles = StyleSheet.create({
  provider: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F8',
    padding: 10,
    borderRadius: 8,
  },
  providerLogo: {
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 6,
    marginEnd: 8,
  },
  providerText: {
    flex: 1,
  },
});
