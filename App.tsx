import React from 'react';
import Toast from 'react-native-toast-message';
import {Provider as MobxProvider} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import RootNavigator from './src/navigators/root-navigator';

import AuthStore from './src/stores/auth-store';
import CreditsStore from './src/stores/credits-store';
import ViewAllStore from './src/stores/view-all-store';
import TvViewAllStore from './src/stores/tv-view-all-store';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <MobxProvider
        AuthStore={AuthStore}
        CreditsStore={CreditsStore}
        ViewAllStore={ViewAllStore}
        TvViewAllStore={TvViewAllStore}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </MobxProvider>
      <Toast />
    </>
  );
};

export default App;
