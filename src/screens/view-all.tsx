import React from 'react';
import {inject, observer} from 'mobx-react';
import {StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import VerticalList from '../components/lists/vertical-list';

import {ViewAllStoreType} from '../stores/view-all-store';

import {COLORS, DYNAMIC, FONTS} from '../constants';

const ViewAll = inject('ViewAllStore')(
  observer(({ViewAllStore}: {ViewAllStore?: ViewAllStoreType}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    if (ViewAllStore?.pageTitle === null || ViewAllStore?.data.length === 0) {
      navigation.goBack();
    }

    return (
      <SafeAreaView style={styles.container}>
        <AntDesignIcon
          size={24}
          name="arrowleft"
          color={COLORS.primary}
          onPress={navigation.goBack}
        />

        <Text style={[DYNAMIC.h4(FONTS.ibm, COLORS.primary), styles.title]}>
          {ViewAllStore?.pageTitle}
        </Text>

        <VerticalList data={ViewAllStore!.data} />
      </SafeAreaView>
    );
  }),
);

export default ViewAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 24,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 10,
  },
});
