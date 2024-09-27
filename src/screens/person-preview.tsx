import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import PersonDetails from '../components/person-details';

import {useGetDetails} from '../api/person/use-get-details';

import {COLORS, DYNAMIC, FONTS} from '../constants';

type ParamList = {
  PersonPreview: {
    id: number;
  };
};

const PersonPreview = () => {
  const {width} = useWindowDimensions();

  const {params} = useRoute<RouteProp<ParamList, 'PersonPreview'>>();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  if (!params?.id) {
    navigation.goBack();
  }

  const {data, isLoading} = useGetDetails(params.id);

  if (isLoading) {
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
      <View style={styles.header}>
        <AntDesignIcon
          size={24}
          name="arrowleft"
          color={COLORS.primary}
          onPress={navigation.goBack}
        />
        <Text style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>{data?.name}</Text>
        <View />
      </View>

      <Image
        style={[styles.image, {width: width - 48}]}
        source={{
          uri: `https://image.tmdb.org/t/p/original${data?.profile_path}`,
        }}
      />

      <PersonDetails
        overview={data!.biography}
        name={data!.name}
        knownFor={data!.known_for_department}
        dob={data!.birthday}
        birthPlace={data!.place_of_birth}
        movies={data!.combined_credits.cast}
      />
    </ScrollView>
  );
};

export default PersonPreview;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  container: {
    backgroundColor: COLORS.white,
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 15,
  },
  image: {
    aspectRatio: 1.77,
    objectFit: 'cover',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.gray400,
    marginVertical: 24,
    alignSelf: 'center',
  },
});
