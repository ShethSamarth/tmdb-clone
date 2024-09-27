import React from 'react';
import {inject, observer} from 'mobx-react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigator from './auth-navigator';
import DefaultNavigator from './default-navigator';

import {AuthStoreType} from '../stores/auth-store';

const Stack = createNativeStackNavigator();

const RootNavigator = inject('AuthStore')(
  observer(({AuthStore}: {AuthStore?: AuthStoreType}) => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'ios',
          statusBarColor: 'white',
          statusBarStyle: 'dark',
        }}>
        {AuthStore?.loggedIn ? (
          <Stack.Screen name="DefaultNavigator" component={DefaultNavigator} />
        ) : (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    );
  }),
);

export default RootNavigator;
