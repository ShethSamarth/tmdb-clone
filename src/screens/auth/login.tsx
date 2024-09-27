import React, {useState} from 'react';
import {inject, observer} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';
import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';

import Input from '../../components/input';
import Button from '../../components/button';

import {useLogin} from '../../api/auth/use-login';
import {useGuestSession} from '../../api/auth/use-guest-session';

import {AuthStoreType} from '../../stores/auth-store';

import {COLORS, DYNAMIC, FONTS, STATIC} from '../../constants';

const Login = inject('AuthStore')(
  observer(({AuthStore}: {AuthStore?: AuthStoreType}) => {
    const [form, setForm] = useState({username: '', password: ''});
    const [error, setError] = useState({username: '', password: ''});

    const {mutate: guestSession, isPending: guestPending} = useGuestSession();
    const {mutate: login, isPending: loginPending} = useLogin();

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

    const handleSubmit = () => {
      if (form.username.length < 3) {
        setError(prev => ({
          ...prev,
          username: 'Username too short',
        }));
      } else {
        setError(prev => ({...prev, username: ''}));
      }
      if (form.password.length < 4) {
        setError(prev => ({
          ...prev,
          password: 'Password too short',
        }));
      } else {
        setError(prev => ({...prev, password: ''}));
      }

      if (form.username.length < 3 || form.password.length < 4) {
        return;
      }

      login(form, {
        onSuccess: data => {
          if (data.success && data.session_id) {
            AuthStore?.setSessionId(data.session_id);
            AuthStore?.setLoggedIn(true);
          }
        },
      });
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={DYNAMIC.h1(FONTS.rubik, COLORS.primary, 'center')}>
            Hello Again!
          </Text>
          <Text
            style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray800, 'center')}>
            We are pleased to have you back!{'\n'}Please enter your details
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            placeholder="Username"
            value={form.username}
            error={error.username}
            onChangeText={e => setForm({...form, username: e})}
          />
          <Input
            isPassword
            placeholder="Password"
            value={form.password}
            error={error.password}
            onSubmitEditing={handleSubmit}
            onChangeText={e => setForm({...form, password: e})}
          />
        </View>

        <View style={styles.link}>
          <Text
            style={STATIC.link}
            onPress={() =>
              Linking.openURL('https://www.themoviedb.org/reset-password')
            }>
            Forget Password?
          </Text>
        </View>

        <View style={styles.btnContainer}>
          <Button disabled={loginPending} onPress={handleSubmit}>
            Log In
          </Button>

          <View style={styles.linesContainer}>
            <LinearGradient
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={styles.lines}
              colors={['#C8C8C8', '#FFFFFF']}
            />

            <Text
              style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.gray600, 'center')}>
              Or continue with
            </Text>

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.lines}
              colors={['#C8C8C8', '#FFFFFF']}
            />
          </View>

          <Button disabled={guestPending} onPress={handleGuestSession}>
            Continue as a Guest
          </Button>
        </View>

        <Text style={DYNAMIC.bodyDefault(FONTS.ibm, COLORS.primary, 'center')}>
          Not a member?{' '}
          <Text
            style={STATIC.link}
            onPress={() =>
              Linking.openURL('https://www.themoviedb.org/signup')
            }>
            Register Here
          </Text>
        </Text>

        <View />
      </ScrollView>
    );
  }),
);

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    minHeight: '100%',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    rowGap: 15,
    paddingHorizontal: 13,
    paddingTop: 40,
    paddingBottom: 60,
  },
  form: {
    rowGap: 18,
  },
  link: {
    alignItems: 'flex-end',
    paddingTop: 15,
  },
  btnContainer: {
    rowGap: 50,
    paddingVertical: 50,
  },
  linesContainer: {
    columnGap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lines: {height: 1.5, flex: 1},
});
