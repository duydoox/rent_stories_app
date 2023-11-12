import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { resetNavigate } from '@/navigators/utils';

const Login = ({}: ApplicationScreenProps) => {
  const { Layout, MetricsSizes, Gutters, Fonts, Common, Colors } = useTheme();

  return (
    <View style={[Layout.fill, Gutters.largeTPadding]}>
      <View style={[Layout.alignItemsCenter, Gutters.largeTMargin]}>
        <Text style={[Fonts.titleSmall]}>Đăng nhập</Text>
        <Brand height={MetricsSizes.large * 2} width={MetricsSizes.large * 2} />
      </View>

      <View
        style={[
          Gutters.regularHMargin,
          Layout.fill,
          Layout.justifyContentCenter,
        ]}
      >
        <TextInput
          style={[Common.input.common, Gutters.regularBMargin]}
          placeholder="Tài khoản"
          placeholderTextColor={Colors.textGray200}
        />
        <TextInput
          style={[Common.input.common]}
          placeholder="Mật khẩu"
          secureTextEntry
          placeholderTextColor={Colors.textGray200}
        />
      </View>

      <TouchableOpacity
        style={[
          Gutters.largeBMargin,
          Gutters.regularHMargin,
          Common.button.rounded,
        ]}
        onPress={() => resetNavigate([{ name: 'Main' }])}
      >
        <Text style={[Fonts.textSmall, Fonts.textBold500]}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
