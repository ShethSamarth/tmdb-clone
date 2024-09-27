/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Movies from '../screens/tabs/movies';
import People from '../screens/tabs/people';
import TvShows from '../screens/tabs/tv-shows';

import {COLORS, FONTS} from '../constants';

const Tab = createBottomTabNavigator();

interface TabBarButtonProps {
  title: string;
  iconName: string;
  focused: boolean;
  onPress: (e: any) => void;
}

const TabBarButton = ({
  title,
  iconName,
  focused,
  onPress,
}: TabBarButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.container, {flex: focused ? 1.2 : 0.5}]}>
      <View
        style={[
          styles.btn,
          {backgroundColor: focused ? COLORS.gray100 : COLORS.white},
        ]}>
        <IonIcons name={iconName} size={25} color={COLORS.secondary} />
        {focused && <Text style={styles.btnText}>{title}</Text>}
      </View>
    </Pressable>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {height: 60},
      }}>
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarButton: props => (
            <TabBarButton
              title="Movies"
              iconName="film-outline"
              onPress={props.onPress!}
              focused={props.accessibilityState?.selected!}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TvShows"
        component={TvShows}
        options={{
          tabBarButton: props => (
            <TabBarButton
              title="TV Shows"
              iconName="tv-outline"
              onPress={props.onPress!}
              focused={props.accessibilityState?.selected!}
            />
          ),
        }}
      />
      <Tab.Screen
        name="People"
        component={People}
        options={{
          tabBarButton: props => (
            <TabBarButton
              title="People"
              onPress={props.onPress!}
              iconName="person-outline"
              focused={props.accessibilityState?.selected!}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 4,
    paddingVertical: 8,
    width: '70%',
    borderRadius: 50,
  },
  btnText: {
    fontFamily: FONTS.ibm,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    color: COLORS.secondary,
  },
});
