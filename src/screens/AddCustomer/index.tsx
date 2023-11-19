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
import { Header, Search } from '@/components';
import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { doFaker } from '@/store/faker';
import { goBack } from '@/navigators/utils';
import { randomId } from '@/utils';
import { KhachHang } from 'types/faker';

const AddCustomer = ({ route }: AddCustomerScreenProps) => {
  const { Layout, Gutters, Fonts, Common, Colors } = useTheme();
  const { chooseCustomer } = route.params;
  const [khachHang, setKhachHang] = useState<Partial<KhachHang>>({
    id: randomId(),
  });

  const { khachHangs } = useAppSelector(state => state.faker);
  const dispatch = useDispatch();

  const submit = (kh: Partial<KhachHang>) => {
    dispatch(
      doFaker({
        khachHangs: [...(khachHangs ?? []), kh],
      }),
    );
    chooseCustomer(kh);
    goBack();
  };

  return (
    <View style={[Layout.fill]}>
      <Header title={'Thêm khách hàng'} />
      <View
        style={[
          Gutters.smallHPadding,
          Gutters.smallVMargin,
          Common.backgroundCommon,
        ]}
      >
        <Search placeholder="Tìm kiếm khách hàng" />
      </View>
      <ScrollView>
        <View style={[Gutters.smallHPadding, Gutters.regularVMargin]}>
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
          onPress={() => submit(khachHang)}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>Thêm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCustomer;
