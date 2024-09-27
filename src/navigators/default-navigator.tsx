import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DrawerNavigator from './drawer-navigator';

import Search from '../screens/search';
import Seasons from '../screens/seasons';
import ViewAll from '../screens/view-all';
import TvViewAll from '../screens/tv-view-all';
import MovieRating from '../screens/movie-rating';
import MoviePreview from '../screens/movie-preview';
import TvShowRating from '../screens/tv-show-rating';
import PersonPreview from '../screens/person-preview';
import TvShowPreview from '../screens/tv-show-preview';
import CreditsViewAll from '../screens/credits-view-all';
import CollectionPreview from '../screens/collection-preview';

const Stack = createNativeStackNavigator();

const DefaultNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'ios'}}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ViewAll" component={ViewAll} />
      <Stack.Screen name="TvViewAll" component={TvViewAll} />
      <Stack.Screen name="MoviePreview" component={MoviePreview} />
      <Stack.Screen name="TvShowPreview" component={TvShowPreview} />
      <Stack.Screen name="PersonPreview" component={PersonPreview} />
      <Stack.Screen name="CreditsViewAll" component={CreditsViewAll} />
      <Stack.Screen name="CollectionPreview" component={CollectionPreview} />
      <Stack.Screen name="Seasons" component={Seasons} />
      <Stack.Screen
        name="MovieRating"
        component={MovieRating}
        options={{statusBarHidden: true}}
      />
      <Stack.Screen
        name="TvShowRating"
        component={TvShowRating}
        options={{statusBarHidden: true}}
      />
    </Stack.Navigator>
  );
};

export default DefaultNavigator;
