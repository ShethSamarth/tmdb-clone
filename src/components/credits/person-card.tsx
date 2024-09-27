import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {COLORS, FONTS} from '../../constants';

interface PersonCardProps {
  id: number;
  image: string;
  name: string;
  work: string;
}

const PersonCard = ({id, image, name, work}: PersonCardProps) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {width: width > 500 ? (width - 78) / 3 : (width - 63) / 2},
      ]}
      onPress={() => navigation.push('PersonPreview', {id})}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original${image}`,
        }}
        style={styles.img}
      />
      <View style={styles.filter} />
      <View style={styles.details}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{work}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PersonCard;

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    aspectRatio: 0.8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.gray200,
  },
  filter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  details: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONTS.ibm,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: COLORS.white,
    fontWeight: '700',
  },
});
