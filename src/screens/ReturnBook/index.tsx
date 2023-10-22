import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';

const ReturnBook = ({}: ApplicationScreenProps) => {
  const { Layout } = useTheme();

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
    </View>
  );
};

export default ReturnBook;
