import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand, Header } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';

const Home = ({}: ApplicationScreenProps) => {
  const { Layout } = useTheme();

  return (
    <View style={[Layout.fill]}>
      <Header title="Trang chủ" isMenu />
      <View style={[Layout.center, Layout.fill]}>
        <Brand />
      </View>
    </View>
  );
};

export default Home;
