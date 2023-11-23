import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { resetNavigate } from '@/navigators/utils';
import { useLoginMutation } from '@/services/modules/auth';
import useLoadingGlobal from '@/hooks/useLoadingGlobal';

const Login = ({}: ApplicationScreenProps) => {
  const { Layout, MetricsSizes, Gutters, Fonts, Common, Colors } = useTheme();

  const [username, setUsername] = useState<string>('duy2');
  const [password, setPassword] = useState<string>('123');

  const [handleLoginApi] = useLoginMutation({});
  const loading = useLoadingGlobal();

  const onLogin = () => {
    loading?.toogleLoading?.(true, 'login');
    handleLoginApi({
      username: username,
      password: password,
    })
      .then(() => {
        resetNavigate([{ name: 'Main' }]);
      })
      .finally(() => {
        loading?.toogleLoading?.(false, 'login');
      });
  };

  return (
    <View style={[Layout.fill, Gutters.largeTPadding]}>
      <View style={[Layout.alignItemsCenter, Gutters.largeTMargin]}>
        <Text style={[Fonts.titleSmall, Fonts.textBlue, Gutters.tinyBMargin]}>
          Đăng nhập
        </Text>
        <Brand height={MetricsSizes.large * 2} width={MetricsSizes.large * 2} />
      </View>

      <View
        style={[
          Gutters.regularHMargin,
          Layout.fill,
          Layout.justifyContentCenter,
        ]}
      >
        <Text style={[Fonts.textSmall, Gutters.tinyBMargin, Fonts.textBold500]}>
          Tên đăng nhập
        </Text>
        <TextInput
          style={[Common.input.common, Gutters.regularBMargin, Fonts.textSmall]}
          placeholder="Tài khoản"
          placeholderTextColor={Colors.textGray200}
          value={username}
          onChangeText={setUsername}
        />
        <Text style={[Fonts.textSmall, Gutters.tinyBMargin, Fonts.textBold500]}>
          Mật khẩu
        </Text>
        <TextInput
          style={[Common.input.common, Fonts.textSmall]}
          placeholder="Mật khẩu"
          secureTextEntry
          placeholderTextColor={Colors.textGray200}
          value={password}
          onChangeText={setPassword}
        />
        <Text
          style={[
            Layout.selfEnd,
            Fonts.textSmall,
            Fonts.textViolet,
            Gutters.tinyTMargin,
          ]}
        >
          Quên mật khẩu?
        </Text>
      </View>

      <TouchableOpacity
        style={[
          Gutters.largeBMargin,
          Gutters.regularHMargin,
          Common.button.rounded,
        ]}
        onPress={onLogin}
      >
        <Text style={[Fonts.textSmall, Fonts.textBold500]}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
