import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import Header from './header';

import {CreditsStoreType} from '../../stores/credits-store';

import {Cast, Crew} from '../../../types';
import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface CreditsListProps {
  cast?: Cast[];
  crew?: Crew[];
  CreditsStore?: CreditsStoreType;
}

const CreditsList = inject('CreditsStore')(
  observer(({cast, crew, CreditsStore}: CreditsListProps) => {
    const {width} = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const onViewAll = () => {
      CreditsStore?.setCast(cast!);
      CreditsStore?.setCrew(crew!);
      navigation.push('CreditsViewAll');
    };

    return (
      <View style={styles.container}>
        <Header title="Cast & Crew" onViewAll={onViewAll} />
        {cast && cast.length > 0 && (
          <FlatList
            horizontal
            data={cast.slice(0, 5)}
            contentContainerStyle={styles.list}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[styles.card, {width: width / 3}]}
                onPress={() => navigation.push('PersonPreview', {id: item.id})}>
                <Image
                  style={[styles.profile, {width: width / 4.5}]}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${item.profile_path}`,
                  }}
                />
                <Text
                  style={DYNAMIC.bodyLarge(
                    FONTS.ibm,
                    COLORS.primary,
                    'center',
                  )}>
                  {item.original_name}
                </Text>
                <Text
                  style={DYNAMIC.bodyDefault(
                    FONTS.ibm,
                    COLORS.gray700,
                    'center',
                  )}>
                  {item.character}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }),
);

export default CreditsList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    rowGap: 10,
  },
  list: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    columnGap: 12,
  },
  card: {
    alignItems: 'center',
    rowGap: 6,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  profile: {
    aspectRatio: 1,
    borderRadius: 99,
  },
});
