import React from 'react';
import { View } from 'react-native';
import { CircleLoading } from '@/components';
import useTheme from '../useTheme';

const Loading = () => {
  const { Layout, Colors } = useTheme();
  return (
    <View
      style={[Layout.fill, Layout.center, { backgroundColor: Colors.black_30 }]}
    >
      <CircleLoading />
    </View>
  );
};

export default Loading;
