import { useTheme } from '@/hooks';
import useLoadingGlobal from '@/hooks/useLoadingGlobal';
import { useLazyGetKhachHangQuery } from '@/services/modules/khachHang';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KhachHang } from 'types/faker';

type Props = {
  chooseCustomer: (t: KhachHang) => void;
  cancel: () => void;
};

const KhachHangInput = ({ chooseCustomer, cancel }: Props) => {
  const { Layout, Gutters, Fonts, Common } = useTheme();
  const [maKhachHang, setMaKhachHang] = useState('');
  const [errorMessage, setErrMsg] = useState<string>();

  const [handleGetKhachHang] = useLazyGetKhachHangQuery({});

  const loading = useLoadingGlobal();

  const xacNhan = () => {
    if (maKhachHang.trim() === '') {
      setErrMsg('Chưa nhập mã khách hàng');
      return;
    }
    loading?.toogleLoading?.(true, 'khach hang');
    handleGetKhachHang({
      maKhachHang,
    })
      .unwrap()
      .then(data => {
        chooseCustomer(data.data);
        cancel();
      })
      .finally(() => {
        loading?.toogleLoading?.(false, 'khach hang');
      });
  };

  return (
    <View style={[]}>
      <Text style={[Fonts.textRegular, Fonts.textBold]}>Quét truyện</Text>
      <Text style={[Fonts.textSmall, Fonts.textBold500, Gutters.tinyTMargin]}>
        Mã truyện
      </Text>
      <TextInput
        style={[Common.input.common]}
        placeholder="Nhập mã truyện"
        value={maKhachHang}
        onChangeText={t => {
          setMaKhachHang(t);
          if (t?.length !== 0) {
            setErrMsg(undefined);
          }
        }}
      />
      {errorMessage && (
        <Text style={[Fonts.textTiny, Fonts.textError]}>{errorMessage}</Text>
      )}
      <View style={[Layout.row, Layout.selfEnd]}>
        <TouchableOpacity
          style={[
            Layout.selfEnd,
            Gutters.regularTPadding,
            Gutters.tinyBPadding,
          ]}
          onPress={cancel}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold]}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Layout.selfEnd,
            Gutters.regularTPadding,
            Gutters.tinyBPadding,
            Gutters.regularLPadding,
          ]}
          onPress={xacNhan}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold]}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default KhachHangInput;
