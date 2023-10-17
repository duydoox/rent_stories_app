import React from 'react';
import { useTheme } from '@/Hooks';
import { View } from 'react-native';
import CircleLoading from '@/Components/CircleLoading';

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
