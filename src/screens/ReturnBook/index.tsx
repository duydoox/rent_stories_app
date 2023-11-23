import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { CustomModal, Header, Search } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { KhachHang } from 'types/faker';
import { useGetTatCaKhachHangQuery } from '@/services/modules/khachHang';
import KhachHangInput from '../RentBook/components/KhachHangInput';

const ReturnBook = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters, Fonts, Common } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const [keyword, setKeyword] = useState('');

  const { data: dsKhachHang } = useGetTatCaKhachHangQuery(
    {
      keyword,
    },
    { refetchOnMountOrArgChange: 5 },
  );

  const chonKhachHang = (kh: KhachHang) => {
    navigation.navigate('ReturnBookDetail', { khachHang: kh });
  };

  return (
    <View style={[Layout.fill]}>
      <Header title={'Trả truyện'} isMenu />
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
          onPress={() => setShowModal(true)}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>Quét</Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        visivle={!!showModal}
        onBackButtonPress={() => setShowModal(false)}
      >
        <View
          style={[
            Common.backgroundWhite,
            Layout.fullWidth,
            Gutters.largeHMargin,
            Gutters.smallHPadding,
            Gutters.smallVPadding,
            Common.radiusSmall,
          ]}
        >
          <KhachHangInput
            cancel={() => setShowModal(false)}
            chooseCustomer={chonKhachHang}
          />
        </View>
      </CustomModal>
    </View>
  );
};

export default ReturnBook;
