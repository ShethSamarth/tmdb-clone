import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useGuestSession} from '../../api/auth/use-guest-session';

import {AuthStoreType} from '../../stores/auth-store';

import {COLORS, DYNAMIC, FONTS, STATIC} from '../../constants';

const Welcome = inject('AuthStore')(
  observer(({AuthStore}: {AuthStore?: AuthStoreType}) => {
    const {height, width} = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const {mutate: guestSession, isPending: guestPending} = useGuestSession();

    const handleGuestSession = () => {
      guestSession(undefined, {
        onSuccess: data => {
          if (data.success && data.guest_session_id) {
            AuthStore?.setGuestSessionId(data.guest_session_id);
            AuthStore?.setExpiresAt(data.expires_at);
            AuthStore?.setIsGuest(true);
            AuthStore?.setLoggedIn(true);
          }
        },
      });
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={[
            styles.img,
            {height: height / 2 > width - 48 ? width - 48 : height / 2},
          ]}
          source={require('../../../assets/images/welcome.png')}
        />
        <View style={styles.content}>
          <Text style={DYNAMIC.h1(FONTS.rubik, COLORS.primary, 'center')}>
            Entertainment{'\n'}at your Comfort
          </Text>
          <Text
            style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.secondary, 'center')}>
            The Movie Database (TMDB) is a community{'\n'}built movie and TV
            database. Every piece of{'\n'}data has been added by our amazing
            {'\n'}
            community dating back to 2008.
          </Text>
        </View>

        <View style={[styles.btnContainer, {maxWidth: height / 1.5}]}>
          <Text
            style={[styles.btn, styles.btnActive]}
            onPress={() => navigation.push('Login')}>
            Log In
          </Text>
          <Text
            style={[styles.btn, styles.btnNotActive]}
            onPress={() =>
              Linking.openURL('https://www.themoviedb.org/signup')
            }>
            Register
          </Text>
        </View>

        <View style={styles.link}>
          <Text
            style={STATIC.link}
            disabled={guestPending}
            onPress={handleGuestSession}>
            Continue As A Guest!
          </Text>
        </View>
      </ScrollView>
    );
  }),
);

export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    minHeight: '100%',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  img: {
    width: '100%',
    resizeMode: 'contain',
  },
  content: {
    rowGap: 15,
    paddingHorizontal: 13,
    paddingTop: 25,
    paddingBottom: 60,
  },
  btnContainer: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  btn: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: FONTS.ibm,
    textAlign: 'center',
    borderRadius: 8,
    padding: 15,
  },
  btnActive: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
  },
  btnNotActive: {
    backgroundColor: COLORS.white,
    color: COLORS.primary,
  },
  link: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});
