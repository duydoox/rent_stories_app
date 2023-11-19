import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Header, Search } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { useAppSelector } from '@/store';
import { dateFormat, numberWithCommas } from '@/utils';

const ReturnBook = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Fonts, Common, Gutters } = useTheme();

  const { phieuThues } = useAppSelector(state => state.faker);

  return (
    <View style={[Layout.fill]}>
      <Header title="Danh sách thuê" isMenu />
      <View
        style={[
          Gutters.smallHPadding,
          Gutters.smallVMargin,
          Common.backgroundCommon,
        ]}
      >
        <Search placeholder="Tìm kiếm phiếu thuê" />
      </View>
      <ScrollView>
        <View
          style={[
            Layout.row,
            Gutters.tinyHMargin,
            Common.backgroundPrimary,
            Gutters.tinyVPadding,
          ]}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500, { flex: 1 }]}>
            Mã phiếu
          </Text>
          <Text
            style={[
              Fonts.textSmall,
              Fonts.textBold500,
              Fonts.textCenter,
              { flex: 1 },
            ]}
          >
            Khách thuê
          </Text>
          <Text
            style={[
              Fonts.textSmall,
              Fonts.textBold500,
              Fonts.textCenter,
              { flex: 1 },
            ]}
          >
            Ngày trả
          </Text>
          <Text
            style={[
              Fonts.textSmall,
              Fonts.textBold500,
              Fonts.textRight,
              { flex: 1 },
            ]}
          >
            Tổng tiền
          </Text>
        </View>
        {phieuThues?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[Layout.row, Gutters.tinyHMargin, Gutters.tinyVMargin]}
            onPress={() =>
              navigation.navigate('ReturnBookDetail', { phieuThue: item })
            }
          >
            <Text style={[Fonts.textSmall, { flex: 1 }]}>{item.id}</Text>
            <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
              {item.khachHang?.tenKhachHang}
            </Text>
            <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
              {dateFormat(new Date(item.truyenDuocThue?.[0]?.ngayTra))}
            </Text>
            <Text style={[Fonts.textSmall, Fonts.textRight, { flex: 1 }]}>
              {numberWithCommas(item.tongTien ?? 0)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ReturnBook;
