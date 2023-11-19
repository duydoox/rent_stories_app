import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Header } from '../../components';
import { ReturnBookDetailScreenProps } from '../../../@types/navigation';
import { dateFormat, numberWithCommas } from '@/utils';

const ReturnBookDetail = ({
  navigation,
  route,
}: ReturnBookDetailScreenProps) => {
  const { Layout, Fonts, Common, Gutters } = useTheme();
  const { phieuThue } = route.params;

  return (
    <View style={[Layout.fill]}>
      <Header title="Trả sách" isMenu={false} />
      <ScrollView>
        <View style={[Gutters.smallHPadding]}>
          <Text
            style={[Fonts.textRegular, Fonts.textBold500, Gutters.smallTMargin]}
          >
            Danh sách thuê
          </Text>

          <View style={[Gutters.tinyVMargin]}>
            <View
              style={[
                Layout.row,
                Common.backgroundPrimary,
                Gutters.tinyVPadding,
              ]}
            >
              <Text style={[Fonts.textSmall, Fonts.textBold, { flex: 2 }]}>
                Tên
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textBold,
                  Fonts.textCenter,
                  { flex: 1 },
                ]}
              >
                Giá
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textBold,
                  Fonts.textCenter,
                  { flex: 1 },
                ]}
              >
                Số lượng
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textBold,
                  Fonts.textRight,
                  { flex: 1 },
                ]}
              >
                Tổng
              </Text>
            </View>
            {phieuThue?.truyenDuocThue?.map((truyen, index) => (
              <View
                key={index}
                style={[
                  Layout.row,
                  Layout.justifyContentBetween,
                  Gutters.tinyVMargin,
                ]}
              >
                <Text style={[Fonts.textSmall, { flex: 2 }]}>
                  {truyen?.truyen?.tenTruyen}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                  {numberWithCommas(truyen.giaThue)}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                  {truyen?.soLuong}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textRight, { flex: 1 }]}>
                  {numberWithCommas(truyen.giaThue)}đ
                </Text>
              </View>
            ))}
          </View>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.tinyTMargin,
            ]}
          >
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Tổng</Text>
            <Text style={[Fonts.textSmall, Fonts.textBold500, Fonts.textRed]}>
              {numberWithCommas(+phieuThue.tongTien ?? 0)}đ
            </Text>
          </View>
          <View style={[Gutters.smallTMargin]}>
            <Text style={[Fonts.textTiny, Fonts.textItalic]}>
              Ngày thuê:{' '}
              {dateFormat(new Date(phieuThue.truyenDuocThue?.[0]?.ngayThue))}
            </Text>
            <Text style={[Fonts.textTiny, Fonts.textItalic]}>
              Ngày trả:{' '}
              {dateFormat(new Date(phieuThue.truyenDuocThue?.[0]?.ngayTra))}
            </Text>
            <Text style={[Fonts.textTiny, Fonts.textItalic]}>
              Khách hàng: {phieuThue.khachHang?.tenKhachHang}
            </Text>
            <Text style={[Fonts.textTiny, Fonts.textItalic]}>
              Liên hệ: {phieuThue.khachHang?.soDienThoai}
            </Text>

            <Text style={[Fonts.textTiny, Fonts.textItalic]}>
              Ghi chú: {phieuThue.ghiChu}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[Gutters.smallBMargin, Layout.rowReverse]}>
        <TouchableOpacity
          style={[
            Layout.selfCenter,
            Common.backgroundPrimary,
            Gutters.smallVPadding,
            Gutters.regularHPadding,
            Common.radiusTiny,
            Gutters.smallBMargin,
            Gutters.smallRMargin,
          ]}
          onPress={() => navigation.navigate('Bill', { phieuThue: phieuThue })}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>Tạo hóa đơn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReturnBookDetail;
