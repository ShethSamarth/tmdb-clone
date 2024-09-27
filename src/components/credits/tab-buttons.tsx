import React, {useState} from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {COLORS, DYNAMIC, FONTS} from '../../constants';

export type TabButtonType = {
  title: string;
};

interface TabButtonsProps {
  buttons: TabButtonType[];
  selectedTab: number;
  setSelectedTab: (tab: number) => void;
}

const TabButtons = ({
  buttons,
  selectedTab,
  setSelectedTab,
}: TabButtonsProps) => {
  const [dimensions, setDimensions] = useState({height: 20, width: 100});

  const buttonWidth = dimensions.width / buttons.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const handlePress = (index: number) => setSelectedTab(index);

  const tabPositionX = useSharedValue(0);

  const onTabPress = (index: number) => {
    tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
      runOnJS(handlePress)(index);
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: tabPositionX.value}],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.activeBtn,
          {height: dimensions.height - 5, width: buttonWidth - 8},
          animatedStyle,
        ]}
      />
      <View onLayout={onTabbarLayout} style={styles.tabContainer}>
        {buttons.map((button, index) => {
          const color = selectedTab === index ? COLORS.gray100 : COLORS.primary;

          return (
            <Pressable
              key={index}
              style={styles.btn}
              onPress={() => onTabPress(index)}>
              <Text style={DYNAMIC.bodyDefault(FONTS.ibm, color, 'center')}>
                {button.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabButtons;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '50%',
    maxHeight: 50,
    aspectRatio: 5,
  },
  activeBtn: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
  },
});
