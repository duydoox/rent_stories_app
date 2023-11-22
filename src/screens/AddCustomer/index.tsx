import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks';
import { AddCustomerScreenProps } from '../../../@types/navigation';
import { CustomModal, Header, Search } from '@/components';
import { goBack } from '@/navigators/utils';
import { KhachHang } from 'types/faker';
import Toast from 'react-native-toast-message';

import {
  useGetTatCaKhachHangQuery,
  useThemKhachHangMutation,
} from '@/services/modules/khachHang';
import useLoadingGlobal from '@/hooks/useLoadingGlobal';

const AddCustomer = ({ route }: AddCustomerScreenProps) => {
  const { Layout, Gutters, Fonts, Common, Colors } = useTheme();
  const { chooseCustomer } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [khachHang, setKhachHang] = useState<KhachHang>({
    maKhachHang: '',
    tenKhachHang: '',
    soDienThoai: '',
  });

  const [keyword, setKeyword] = useState('');

  const { data: dsKhachHang } = useGetTatCaKhachHangQuery(
    {
      keyword,
    },
    { refetchOnMountOrArgChange: 5 },
  );
  const [handleThemKhachHang] = useThemKhachHangMutation({});

  const loading = useLoadingGlobal();

  const themKhachHang = () => {
    loading?.toogleLoading?.(true, 'them khach hang');
    handleThemKhachHang({
      tenKhachHang: khachHang.tenKhachHang ?? '',
      soDienThoai: khachHang.soDienThoai ?? '',
    })
      .unwrap()
      .then(kh => {
        setShowModal(false);
        chooseCustomer?.(kh.data);
        goBack();
        Toast.show({
          type: 'success',
          text1: 'Thông báo',
          text2: 'Thêm khách hàng thành công!',
        });
      })
      .finally(() => {
        loading?.toogleLoading?.(false, 'them khach hang');
      });
  };

  const chonKhachHang = (kh: KhachHang) => {
    chooseCustomer?.(kh);
    goBack();
  };

  const showAddKH = () => {
    setShowModal(true);
  };

  return (
    <View style={[Layout.fill]}>
      <Header title={'Thêm khách hàng'} />
      <Search
        placeholder="Tìm kiếm khách hàng"
        showMenu={false}
        onSearch={e => {
          setKeyword(e ?? '');
        }}
      />
      <ScrollView>
        <View style={[Gutters.smallHPadding, Gutters.tinyVMargin]}>
          {dsKhachHang?.data?.map((kh, i) => (
            <TouchableOpacity
              key={i}
              style={[
                Common.shadow,
                Common.radiusTiny,
                Common.backgroundWhite,
                Gutters.tinyVPadding,
                Gutters.smallHPadding,
                Gutters.tinyVMargin,
              ]}
              onPress={() => chonKhachHang(kh)}
            >
              <Text style={[Fonts.textSmall, Fonts.textBold500]}>
                Mã {'      : '}
                {kh.maKhachHang}
              </Text>
              <Text style={[Fonts.textSmall]}>
                Tên {'     : '}
                {kh.tenKhachHang}
              </Text>
              <Text style={[Fonts.textSmall]}>Liên hệ: {kh.soDienThoai}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={[Layout.selfEnd, Layout.row]}>
        <TouchableOpacity
          style={[
            Layout.selfEnd,
            Common.backgroundPrimary,
            Gutters.smallVPadding,
            Gutters.regularHPadding,
            Common.radiusTiny,
            Gutters.smallBMargin,
            Gutters.smallRMargin,
          ]}
          onPress={showAddKH}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>Thêm mới</Text>
        </TouchableOpacity>
      </View>
      <CustomModal
        visivle={showModal}
        onBackButtonPress={() => setShowModal(false)}
      >
        <View
          style={[
            Common.backgroundWhite,
            Layout.fullWidth,
            Gutters.regularHMargin,
            Common.radiusRegular,
            Gutters.smallVPadding,
            Gutters.smallHPadding,
          ]}
        >
          <Text
            style={[Fonts.textRegular, Fonts.textBold500, Gutters.tinyBMargin]}
          >
            Thêm khách hàng
          </Text>
          <View style={[Gutters.smallBMargin]}>
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Khách hàng</Text>
            <TextInput
              placeholder="Tên khách hàng"
              placeholderTextColor={Colors.textGray200}
              style={[
                Common.input.outlineRounded,
                Gutters.tinyTMargin,
                Common.input.text,
              ]}
              value={khachHang.tenKhachHang ?? ''}
              onChangeText={t =>
                setKhachHang({ ...khachHang, tenKhachHang: t })
              }
            />
          </View>

          <View style={[Gutters.smallBMargin]}>
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>
              Số điện thoại
            </Text>
            <TextInput
              placeholder="Số điện thoại"
              placeholderTextColor={Colors.textGray200}
              style={[
                Common.input.outlineRounded,
                Gutters.tinyTMargin,
                Common.input.text,
              ]}
              keyboardType="numeric"
              value={khachHang.soDienThoai ?? ''}
              onChangeText={t => setKhachHang({ ...khachHang, soDienThoai: t })}
            />
          </View>

          <View style={[Layout.selfEnd, Layout.row, Gutters.tinyVPadding]}>
            <Text
              style={[Fonts.textSmall, Fonts.textBold, Gutters.regularLPadding]}
              onPress={() => setShowModal(false)}
            >
              Hủy
            </Text>
            <Text
              style={[Fonts.textSmall, Fonts.textBold, Gutters.regularLPadding]}
              onPress={themKhachHang}
            >
              Thêm
            </Text>
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default AddCustomer;
