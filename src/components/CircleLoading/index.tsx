/* eslint-disable react-native/no-inline-styles */
import React, { memo, useEffect } from 'react';
import { useTheme } from '../../hooks';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Image, StyleSheet, View } from 'react-native';

const CircleLoading = () => {
  const { Layout, Images, Colors, Common, MetricsSizes } = useTheme();
  const rotation = useSharedValue(0);

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withRepeat(
            withTiming(`${rotation.value}deg`, {
              duration: 3000,
              easing: Easing.linear,
            }),
            -1, // lặp vô hạn
            true,
          ),
        },
      ],
    };
  });

  useEffect(() => {
    rotation.value = 360;
  }, [rotation]);

  return (
    <View
      style={[
        Layout.center,
        {
          width: MetricsSizes.large * 2,
          height: MetricsSizes.large * 2,
          borderRadius: MetricsSizes.large,
          backgroundColor: Colors.white_40,
        },
        Common.backgroundWhite,
      ]}
    >
      <Animated.View
        style={[StyleSheet.absoluteFillObject, Layout.center, animatedStyle2]}
      >
        <View
          style={{
            backgroundColor: Colors.transparent,
            width: MetricsSizes.large * 2 - MetricsSizes.tiny,
            height: MetricsSizes.large * 2 - MetricsSizes.tiny,
            borderRadius: MetricsSizes.large,
            borderWidth: 3,
            borderColor: Colors.primary,
            borderStyle: 'dashed',
          }}
        />
      </Animated.View>
      <Image
        source={Images.logo}
        style={[
          {
            width: MetricsSizes.large * 1,
            height: MetricsSizes.large * 1,
            borderRadius: MetricsSizes.tiny,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

export default memo(CircleLoading);
