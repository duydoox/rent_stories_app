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
import { dateFormatTwo, numberWithCommas } from '@/utils';
import { useLuuHoaDonMutation } from '@/services/modules/hoaDon';
import useLoadingGlobal from '@/hooks/useLoadingGlobal';
import { resetNavigate } from '@/navigators/utils';
import Toast from 'react-native-toast-message';

const Bill = ({ route }: BillScreenProps) => {
  const { Common, Fonts, Gutters, Layout, Images } = useTheme();
  const { hoaDon, ngayTra, khachHang } = route.params;

  const tong = hoaDon.truyenDuocTras.reduce(
    (sum, item) => sum + item.tienDaTra,
    0,
  );

  const [handleLuuHoaDon] = useLuuHoaDonMutation({});

  const loading = useLoadingGlobal();

  const luuHoaDon = () => {
    loading?.toogleLoading?.(true, 'luu hoa don');
    handleLuuHoaDon({
      dsTruyenCanTra: hoaDon.truyenDuocTras.map(v => ({
        maTruyenDuocThue: v.truyenDuocThue.maTruyenDuocThue,
        ngayTra: ngayTra,
      })),
    })
      .unwrap()
      .then(() => {
        resetNavigate([{ name: 'Main' }]);
        Toast.show({
          type: 'success',
          text1: 'Thông báo',
          text2: 'Đã thanh toán thành công',
        });
      })
      .finally(() => {
        loading?.toogleLoading?.(false, 'luu hoa don');
      });
  };

  console.log(ngayTra, 'kkkkkkk');

  return (
    <View style={[Layout.fill]}>
      <Header title="Tạo hóa đơn" />
      <ScrollView>
        <View style={[Gutters.smallHPadding, Gutters.smallTMargin]}>
          <Text style={[Fonts.titleSmall]}>Hóa đơn</Text>
          <Text style={[Fonts.textTiny]}>
            Ngày thanh toán: {format(new Date(ngayTra), 'HH:mm dd/MM/yyyy')}
          </Text>

          <Text
            style={[
              Fonts.textSmall,
              Gutters.largeTMargin,
              Fonts.textBold500,
              Fonts.textBlue,
            ]}
          >
            Hóa đơn cho: {khachHang?.tenKhachHang}
          </Text>

          <Text
            style={[
              Fonts.textTiny,
              Fonts.textItalic,
              Fonts.textError,
              Gutters.smallTMargin,
            ]}
          >
            *Tiền bù là tiền cộng thêm khi trả truyện quá hạn
          </Text>
          <View>
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
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textBold500,
                  style.date,
                  style.roundLeft,
                ]}
              >
                Ngày thuê
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textBold500,
                  style.count,
                  style.roundLeft,
                ]}
              >
                Đơn giá
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textBold500,
                  style.price,
                  style.roundLeft,
                ]}
              >
                Tiền bù*
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textBold500,
                  style.money,
                  style.roundLeft,
                ]}
              >
                Thành tiền
              </Text>
            </View>
            {hoaDon.truyenDuocTras?.map((item, index) => (
              <View
                style={[Layout.row, Gutters.tinyVPadding, Common.roundBottom]}
                key={index}
              >
                <Text style={[Fonts.textTiny, style.name]}>
                  {item.truyenDuocThue?.truyen?.tenTruyen}
                </Text>
                <Text style={[Fonts.textTiny, style.date]}>
                  {item.truyenDuocThue?.ngayThue &&
                    dateFormatTwo(item.truyenDuocThue?.ngayThue)}
                </Text>
                <Text style={[Fonts.textTiny, style.price]}>
                  {numberWithCommas(item?.truyenDuocThue?.giaThue ?? 0)}
                </Text>
                <Text style={[Fonts.textTiny, style.count]}>
                  {numberWithCommas(item.tienPhat ?? 0)}
                </Text>
                <Text style={[Fonts.textTiny, style.money, Fonts.textBold500]}>
                  {numberWithCommas(item.tienDaTra ?? 0)}
                </Text>
              </View>
            ))}

            <View style={[Gutters.smallVMargin]}>
              <View style={[Layout.row, Layout.justifyContentBetween]}>
                <Text style={[Fonts.textTiny]}>Tổng cộng: </Text>
                <Text style={[Fonts.textTiny, Fonts.textBold500]}>
                  {numberWithCommas(tong ?? 0)}đ
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
                  {numberWithCommas(tong ?? 0)}đ
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
          onPress={luuHoaDon}
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
    flex: 1.2,
  },
  date: {
    flex: 1.2,
    textAlign: 'center',
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
    flex: 1.2,
    textAlign: 'right',
  },
  roundLeft: {
    borderLeftWidth: 1,
    borderColor: '#777',
  },
});
