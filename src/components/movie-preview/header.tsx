/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useWatchlist} from '../../api/use-watchlist';
import {useFavourites} from '../../api/use-favourites';
import {useGetState} from '../../api/movies/use-get-states';

import {COLORS} from '../../constants';

interface HeaderProps {
  isGuest: boolean;
  session_id: string;
  media_id: number;
  poster: string;
  title: string;
}

const Header = ({
  isGuest,
  session_id,
  media_id,
  poster,
  title,
}: HeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const {data: states, refetch} = useGetState(media_id, session_id);

  const {mutate: favorite, isPending: favoritePending} =
    useFavourites(session_id);
  const {mutate: watchlist, isPending: watchlistPending} =
    useWatchlist(session_id);

  const handleFavourites = (value: boolean) => {
    favorite(
      {media_id, media_type: 'movie', favorite: value},
      {onSuccess: refetch},
    );
  };

  const handleWatchlist = (value: boolean) => {
    watchlist(
      {media_id, media_type: 'movie', watchlist: value},
      {onSuccess: refetch},
    );
  };

  return (
    <View style={styles.container}>
      <AntDesignIcon
        size={24}
        name="arrowleft"
        color={COLORS.primary}
        onPress={navigation.goBack}
      />

      {!isGuest && (
        <View style={styles.right}>
          {!!states && states.rated ? (
            <AntDesignIcon
              size={24}
              name="star"
              color={COLORS.primary}
              onPress={() =>
                navigation.push('MovieRating', {
                  id: media_id,
                  poster,
                  title,
                  rating: states.rated?.value,
                })
              }
            />
          ) : (
            <AntDesignIcon
              size={24}
              name="staro"
              color={COLORS.primary}
              onPress={() =>
                navigation.push('MovieRating', {
                  id: media_id,
                  poster,
                  title,
                })
              }
            />
          )}

          {!!states && states.favorite ? (
            <AntDesignIcon
              size={24}
              name="heart"
              color={COLORS.primary}
              disabled={favoritePending}
              onPress={() => handleFavourites(false)}
              style={{opacity: favoritePending ? 0.5 : 1}}
            />
          ) : (
            <AntDesignIcon
              size={24}
              name="hearto"
              color={COLORS.primary}
              disabled={favoritePending}
              onPress={() => handleFavourites(true)}
              style={{opacity: favoritePending ? 0.5 : 1}}
            />
          )}

          {!!states && states.watchlist ? (
            <IonIcon
              size={24}
              name="bookmark"
              color={COLORS.primary}
              disabled={watchlistPending}
              onPress={() => handleWatchlist(false)}
              style={{opacity: watchlistPending ? 0.5 : 1}}
            />
          ) : (
            <IonIcon
              size={24}
              color={COLORS.primary}
              name="bookmark-outline"
              disabled={watchlistPending}
              onPress={() => handleWatchlist(true)}
              style={{opacity: watchlistPending ? 0.5 : 1}}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
});
