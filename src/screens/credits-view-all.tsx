import React, {useState} from 'react';
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {FlatList, StyleSheet, useWindowDimensions, View} from 'react-native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import TabButtons, {
  type TabButtonType,
} from '../components/credits/tab-buttons';
import PersonCard from '../components/credits/person-card';

import {CreditsStoreType} from '../stores/credits-store';

import {COLORS} from '../constants';

export enum CreditsTab {
  Cast,
  Crew,
}

const CreditsViewAll = inject('CreditsStore')(
  observer(({CreditsStore}: {CreditsStore?: CreditsStoreType}) => {
    const {width} = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    if (CreditsStore?.cast.length === 0 || CreditsStore?.crew.length === 0) {
      navigation.goBack();
    }

    const [selectedTab, setSelectedTab] = useState<CreditsTab>(CreditsTab.Cast);

    const buttons: TabButtonType[] = [{title: 'Cast'}, {title: 'Crew'}];

    return (
      <View style={styles.container}>
        <AntDesignIcon
          size={24}
          name="arrowleft"
          color={COLORS.primary}
          onPress={navigation.goBack}
          style={styles.back}
        />

        <TabButtons
          buttons={buttons}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        {selectedTab === 0 ? (
          <FlatList
            key={width}
            numColumns={width > 500 ? 3 : 2}
            data={CreditsStore?.cast}
            columnWrapperStyle={styles.column}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            renderItem={({item}) => (
              <PersonCard
                key={item.id}
                id={item.id}
                image={item.profile_path}
                name={`${item.original_name} (${item.known_for_department})`}
                work={item.character}
              />
            )}
          />
        ) : (
          <FlatList
            key={width}
            numColumns={width > 500 ? 3 : 2}
            data={CreditsStore?.crew}
            columnWrapperStyle={styles.column}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            renderItem={({item}) => (
              <PersonCard
                key={item.id}
                id={item.id}
                image={item.profile_path}
                name={item.original_name}
                work={item.job}
              />
            )}
          />
        )}
      </View>
    );
  }),
);

export default CreditsViewAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  back: {
    paddingLeft: 24,
    marginBottom: -30,
    maxWidth: 50,
  },
  scrollContainer: {
    padding: 24,
    rowGap: 15,
  },
  column: {
    columnGap: 15,
  },
});
