import React from 'react';
import {inject, observer} from 'mobx-react';
import {StyleSheet, Text, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import Icon from './icon';

import {AuthStoreType} from '../stores/auth-store';

import {useDetails} from '../api/user/use-details';

import {COLORS, DYNAMIC, FONTS} from '../constants';

const TabHeader = inject('AuthStore')(
  observer(({AuthStore}: {AuthStore?: AuthStoreType}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const {data} = useDetails(AuthStore!.session_id);

    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Icon
            size={25}
            name="menu"
            color={COLORS.primary}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
          <Text numberOfLines={1} style={DYNAMIC.h4(FONTS.ibm, COLORS.primary)}>
            Hello {data?.username ? data.username : 'Sunshine'}
          </Text>
        </View>
        <Icon
          size={25}
          name="search"
          color={COLORS.primary}
          onPress={() => navigation.push('Search')}
        />
      </View>
    );
  }),
);

export default TabHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  truncate: {},
});
