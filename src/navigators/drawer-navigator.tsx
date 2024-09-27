/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TabNavigator from './tab-navigator';

import Rating from '../screens/drawer/rating';
import WatchList from '../screens/drawer/watch-list';
import Favourites from '../screens/drawer/favourites';

import TabHeader from '../components/tab-header';
import CustomDrawer from '../components/custom-drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => <CustomDrawer />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {backgroundColor: 'transparent'},
      }}>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{header: () => <TabHeader />, headerShown: true}}
      />
      <Drawer.Screen name="Favourites" component={Favourites} />
      <Drawer.Screen name="Rating" component={Rating} />
      <Drawer.Screen name="WatchList" component={WatchList} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
