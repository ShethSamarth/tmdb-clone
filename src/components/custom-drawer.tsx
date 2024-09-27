import React from 'react';
import {inject, observer} from 'mobx-react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Alert, Image, StyleSheet, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import DrawerButton from './drawer-button';

import {useDeleteSession} from '../api/auth/use-delete-session';

import {AuthStoreType} from '../stores/auth-store';

import {COLORS} from '../constants';

const CustomDrawer = inject('AuthStore')(
  observer(({AuthStore}: {AuthStore?: AuthStoreType}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const {mutate: deleteSession} = useDeleteSession();

    const handleLogout = () => {
      deleteSession(
        {session_id: AuthStore!.session_id},
        {
          onSettled: () => {
            AuthStore?.setSessionId(null);
            AuthStore?.setGuestSessionId(null);
            AuthStore?.setExpiresAt(null);
            AuthStore?.setIsGuest(false);
            AuthStore?.setLoggedIn(false);
          },
        },
      );
    };

    const closeDrawer = () => navigation.dispatch(DrawerActions.closeDrawer());

    const onNavigate = (screen: string) => {
      if (AuthStore?.isGuest) {
        Alert.alert('Error', 'You must be logged in to perform this action.', [
          {text: 'OK', style: 'default', onPress: handleLogout},
          {text: 'Cancel', style: 'cancel', onPress: closeDrawer},
        ]);
        return;
      }

      navigation.navigate(screen);
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} />
          <IonIcon
            size={24}
            color={COLORS.white}
            name="close-circle-outline"
            onPress={closeDrawer}
          />
        </View>
        <View style={styles.nav}>
          <DrawerButton
            label="Favourites"
            onPress={() => onNavigate('Favourites')}
            icon={
              <FontistoIcon size={20} color={COLORS.white} name="heart-alt" />
            }
          />
          <DrawerButton
            label="Rating"
            onPress={() => onNavigate('Rating')}
            icon={<AntDesignIcon size={22} color={COLORS.white} name="staro" />}
          />
          <DrawerButton
            label="Watchlist"
            onPress={() => onNavigate('WatchList')}
            icon={
              <FeatherIcon size={22} color={COLORS.white} name="bookmark" />
            }
          />
        </View>
        <DrawerButton
          label="Logout"
          arrow={false}
          onPress={handleLogout}
          icon={<AntDesignIcon size={22} color={COLORS.white} name="logout" />}
        />
      </View>
    );
  }),
);

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: 60,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 10,
  },
  nav: {
    flex: 1,
    paddingTop: 60,
  },
});
