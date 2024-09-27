import {StyleSheet} from 'react-native';
import React, {type ComponentType, useState} from 'react';
import {TabView, SceneMap, TabBar, type Route} from 'react-native-tab-view';

import {COLORS, DYNAMIC, FONTS} from '../../constants';

interface SeasonTabsProps {
  routes: Route[];
  scenes: {
    [key: string]: ComponentType<any>;
  };
}

const SeasonTabs = ({routes, scenes}: SeasonTabsProps) => {
  const [index, setIndex] = useState(0);

  return (
    <TabView
      onIndexChange={setIndex}
      renderScene={SceneMap(scenes)}
      navigationState={{index, routes}}
      renderTabBar={props => (
        <TabBar
          {...props}
          scrollEnabled
          style={styles.container}
          activeColor={COLORS.primary}
          indicatorStyle={styles.indicator}
          labelStyle={[
            DYNAMIC.bodyLarge(FONTS.ibm, COLORS.gray700),
            styles.label,
          ]}
        />
      )}
    />
  );
};

export default SeasonTabs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    elevation: 0,
  },
  indicator: {
    backgroundColor: COLORS.primary,
    height: 2,
  },
  label: {
    textTransform: 'capitalize',
  },
});
