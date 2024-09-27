import React, {useState} from 'react';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import Toast from 'react-native-toast-message';
import Slider from '@react-native-community/slider';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import Icon from '../components/icon';

import {useAddRating} from '../api/tv-shows/use-add-rating';
import {useDeleteRating} from '../api/tv-shows/use-delete-rating';

import {AuthStoreType} from '../stores/auth-store';

import {COLORS, FONTS} from '../constants';

type ParamList = {
  TvShowRating: {
    id: number;
    title: string;
    poster: string;
    rating: number;
  };
};

const TvShowRating = inject('AuthStore')(
  observer(({AuthStore}: {AuthStore?: AuthStoreType}) => {
    const {params} = useRoute<RouteProp<ParamList, 'TvShowRating'>>();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    if (!params?.id) {
      navigation.goBack();
    }

    const [rating, setRating] = useState(params.rating || 5);

    const {mutate: addRating, isPending: addingRating} = useAddRating(
      AuthStore?.session_id!,
      params.id,
    );
    const {mutate: deleteRating, isPending: deletingRating} = useDeleteRating(
      AuthStore?.session_id!,
      params.id,
    );

    const handleSave = () => {
      addRating(rating, {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Tv Show Rating Added',
          });
          navigation.goBack();
        },
        onError: () =>
          Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Not able to save rating',
          }),
      });
    };

    const handleDelete = () => {
      deleteRating(undefined, {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Tv Show Rating Deleted',
          });
          navigation.goBack();
        },
        onError: () =>
          Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Not able to save rating',
          }),
      });
    };

    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={{uri: `https://image.tmdb.org/t/p/original${params.poster}`}}
        />
        <View style={styles.filter} />

        <View style={styles.tools}>
          <IonIcon
            size={24}
            color={COLORS.white}
            name="close-circle-outline"
            onPress={navigation.goBack}
          />
          {params.rating && (
            <Icon
              size={24}
              name="trash"
              color={COLORS.white}
              onPress={handleDelete}
            />
          )}
        </View>

        <Text style={styles.title}>{params.title}</Text>

        <Image
          style={styles.poster}
          source={{uri: `https://image.tmdb.org/t/p/original${params.poster}`}}
        />

        <View style={styles.sliderContainer}>
          <Text style={styles.rating}>{rating}</Text>
          <Slider
            step={0.5}
            value={rating}
            minimumValue={0}
            maximumValue={10}
            style={styles.slider}
            onValueChange={setRating}
            thumbTintColor={COLORS.white}
            minimumTrackTintColor={COLORS.white}
            maximumTrackTintColor={COLORS.white}
            disabled={addingRating || deletingRating}
          />
        </View>

        <TouchableOpacity
          onPress={handleSave}
          disabled={addingRating}
          style={[styles.btn, addingRating && styles.disabled]}>
          <Text style={styles.text}>Save Rating</Text>
        </TouchableOpacity>
      </View>
    );
  }),
);

export default TvShowRating;

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    objectFit: 'cover',
  },
  filter: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tools: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    paddingBottom: 20,
  },
  title: {
    fontFamily: FONTS.ibm,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    paddingVertical: 20,
  },
  poster: {
    width: '50%',
    maxHeight: 300,
    aspectRatio: 0.8,
    objectFit: 'cover',
    borderRadius: 8,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30,
  },
  rating: {
    fontFamily: FONTS.ibm,
    color: COLORS.white,
    fontWeight: '700',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 4,
    paddingVertical: 8,
    width: 50,
  },
  slider: {
    paddingTop: 20,
    width: '65%',
  },
  btn: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: COLORS.primary,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: FONTS.ibm,
  },
});
