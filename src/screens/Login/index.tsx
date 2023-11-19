import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { resetNavigate } from '@/navigators/utils';
import { useDispatch } from 'react-redux';
import { setNhanVien } from '@/store/auth';
import { useAppSelector } from '@/store';
import { NhanVien } from 'types/faker';
import { randomId } from '@/utils';
import { doFaker } from '@/store/faker';

const Login = ({}: ApplicationScreenProps) => {
  const { Layout, MetricsSizes, Gutters, Fonts, Common, Colors } = useTheme();

  const [username, setUsername] = useState<string>('quanly');
  const [password, setPassword] = useState<string>('123123');

  const { nhanViens } = useAppSelector(state => state.faker);
  const dispatch = useDispatch();

  const onLogin = () => {
    const nv = nhanViens?.find(
      item => item.username === username && item.password === password,
    );
    if (nv) {
      dispatch(
        setNhanVien({
          nhanVien: nv,
        }),
      );
    } else {
      const newNv: Partial<NhanVien> = {
        id: randomId(),
        username: username,
        password: password,
        viTri: 'NV',
        ten: 'Nguyễn Thị Viên',
        soDienThoai: '0343221215',
      };
      dispatch(
        setNhanVien({
          nhanVien: newNv,
        }),
      );
      dispatch(
        doFaker({
          nhanViens: [...(nhanViens ?? []), newNv],
        }),
      );
    }
    resetNavigate([{ name: 'Main' }]);
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
        <Text style={[Fonts.textSmall, Gutters.tinyBMargin]}>
          Tên đăng nhập
        </Text>
        <TextInput
          style={[Common.input.common, Gutters.regularBMargin, Fonts.textSmall]}
          placeholder="Tài khoản"
          placeholderTextColor={Colors.textGray200}
          value={username}
          onChangeText={setUsername}
        />
        <Text style={[Fonts.textSmall, Gutters.tinyBMargin]}>Mật khẩu</Text>
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
