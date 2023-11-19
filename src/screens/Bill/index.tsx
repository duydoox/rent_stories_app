import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../hooks';
import { Header } from '@/components';
import { format } from 'date-fns';
import { BillScreenProps } from 'types/navigation';
import { numberWithCommas } from '@/utils';

const Bill = ({ route }: BillScreenProps) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme();
  const { phieuThue } = route.params;

  return (
    <View style={[Layout.fill]}>
      <Header title="Tạo hóa đơn" />
      <ScrollView>
        <View style={[Gutters.smallHPadding, Gutters.smallTMargin]}>
          <Text style={[Fonts.titleSmall]}>Hóa đơn</Text>
          <Text style={[Fonts.textTiny]}>
            Ngày thuê
            {'           : ' +
              format(
                new Date(phieuThue?.truyenDuocThue?.[0]?.ngayThue),
                'HH:mm dd/MM/yy',
              )}
          </Text>
          <Text style={[Fonts.textTiny]}>
            Ngày thanh toán: {format(new Date(), 'HH:mm dd/MM/yy')}
          </Text>

          <Text
            style={[
              Fonts.textSmall,
              Gutters.largeTMargin,
              Fonts.textBold500,
              Fonts.textBlue,
            ]}
          >
            Hóa đơn cho: {phieuThue.khachHang?.tenKhachHang}
          </Text>

          <View style={[Gutters.smallTMargin]}>
            <View
              style={[
                Layout.row,
                Gutters.tinyVPadding,
                Common.backgroundPrimary,
              ]}
            >
              <Text style={[Fonts.textSmall, Fonts.textBold500, style.name]}>
                Tên
              </Text>
              <Text style={[Fonts.textSmall, Fonts.textBold500, style.count]}>
                Số lượng
              </Text>
              <Text style={[Fonts.textSmall, Fonts.textBold500, style.price]}>
                Đơn giá
              </Text>
              <Text style={[Fonts.textSmall, Fonts.textBold500, style.money]}>
                Thành tiền
              </Text>
            </View>
            {phieuThue.truyenDuocThue?.map((item, index) => (
              <View style={[Layout.row, Gutters.tinyVPadding]} key={index}>
                <Text style={[Fonts.textSmall, style.name]}>
                  {item.truyen?.tenTruyen}
                </Text>
                <Text style={[Fonts.textSmall, style.count]}>
                  {item.soLuong}
                </Text>
                <Text style={[Fonts.textSmall, style.price]}>
                  {item?.giaThue}
                </Text>
                <Text style={[Fonts.textSmall, style.money]}>
                  {item.tongTien}
                </Text>
              </View>
            ))}

            <View style={[Gutters.smallVMargin]}>
              <View style={[Layout.row, Layout.justifyContentBetween]}>
                <Text style={[Fonts.textTiny]}>Tổng cộng: </Text>
                <Text style={[Fonts.textTiny]}>
                  {numberWithCommas(phieuThue.tongTien ?? 0)}đ
                </Text>
              </View>
              <View style={[Layout.row, Layout.justifyContentBetween]}>
                <Text style={[Fonts.textTiny]}>Thuế (0%): </Text>
                <Text style={[Fonts.textTiny]}>0đ</Text>
              </View>

              <View style={[Layout.row, Layout.justifyContentBetween]}>
                <Text style={[Fonts.textRegular, Fonts.textBold500]}>
                  Tổng tiền:
                </Text>
                <Text
                  style={[Fonts.textRegular, Fonts.textBold500, Fonts.textRed]}
                >
                  {numberWithCommas(phieuThue.tongTien ?? 0)}đ
                </Text>
              </View>
            </View>

            <View style={Common.seperate} />

            <View style={[Layout.row, Gutters.regularTMargin]}>
              <View style={[Layout.fill]}>
                <View style={[Layout.rowHCenter]}>
                  <Image
                    source={Images.logo}
                    style={[Common.largeSize]}
                    resizeMode="contain"
                  />
                  <Text style={[Fonts.textRegular, Gutters.tinyLMargin]}>
                    Cửa hàng
                  </Text>
                </View>
                <Text style={[Fonts.textSmall]}>Cảm ơn quý khách!</Text>
              </View>

              <View style={[Layout.fill]}>
                <Text style={[Fonts.textSmall, Fonts.textBold500]}>
                  Thông tin liên hệ:
                </Text>
                <Text style={[Fonts.textSmall]}>+84343221214</Text>
                <Text style={[Fonts.textTiny]}>
                  số 18 đường Tôn Thất Tùng, Đống Đa, Hà Nội
                </Text>
              </View>
            </View>
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
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>In hóa đơn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Bill;

const style = StyleSheet.create({
  name: {
    flex: 1.8,
  },
  count: {
    flex: 0.9,
    textAlign: 'center',
  },
  price: {
    flex: 1,
    textAlign: 'center',
  },
  money: {
    flex: 1,
    textAlign: 'right',
  },
});
