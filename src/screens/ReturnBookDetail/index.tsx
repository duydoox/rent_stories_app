/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Header } from '../../components';
import { ReturnBookDetailScreenProps } from '../../../@types/navigation';
import { dateFormatTwo, numberWithCommas } from '@/utils';
import { useGetDanhSachTruyenThueCuaKhachQuery } from '@/services/modules/truyenDuocThue';
import { useTaoHoaDonMutation } from '@/services/modules/hoaDon';
import useLoadingGlobal from '@/hooks/useLoadingGlobal';
import { TruyenDuocThue } from 'types/faker';
import Toast from 'react-native-toast-message';

const ReturnBookDetail = ({
  navigation,
  route,
}: ReturnBookDetailScreenProps) => {
  const { Layout, Fonts, Common, Gutters, Colors } = useTheme();
  const { khachHang } = route.params;
  const [danhSachCanTra, setDanhSachCanTra] = useState<TruyenDuocThue[]>([]);

  const tong = danhSachCanTra.reduce((sum, item) => sum + item.tongTien, 0);

  const { data: danhSachThue } = useGetDanhSachTruyenThueCuaKhachQuery(
    {
      maKhachHang: khachHang.maKhachHang,
      isUnpaid: true,
    },
    {
      skip: !khachHang.maKhachHang,
      refetchOnMountOrArgChange: true,
    },
  );

  const [handleTaoHoaDon] = useTaoHoaDonMutation({});

  const loading = useLoadingGlobal();

  const chonTruyenTra = (t: TruyenDuocThue) => {
    // const find = danhSachCanTra.find(
    //   v => v.maTruyenDuocThue === t.maTruyenDuocThue,
    // );
    const find = danhSachCanTra.includes(t);
    if (find) {
      setDanhSachCanTra(
        danhSachCanTra.filter(v => v.maTruyenDuocThue !== t.maTruyenDuocThue),
      );
    } else {
      setDanhSachCanTra([...danhSachCanTra, t]);
    }
  };

  const taoHoaDon = () => {
    if (danhSachCanTra.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Vui lòng chọn truyện cần trả',
      });
      return;
    }
    loading?.toogleLoading?.(true, 'tao hoa don');
    const ngayTra = new Date().toISOString();
    handleTaoHoaDon({
      dsTruyenCanTra: danhSachCanTra.map(v => ({
        maTruyenDuocThue: v.maTruyenDuocThue,
        ngayTra: ngayTra,
      })),
    })
      .unwrap()
      .then(data => {
        navigation.navigate('Bill', {
          hoaDon: data.data,
          ngayTra,
          khachHang: khachHang,
        });
      })
      .finally(() => {
        loading?.toogleLoading?.(false, 'tao hoa don');
      });
  };

  return (
    <View style={[Layout.fill]}>
      <Header title="Trả sách" isMenu={false} />
      <ScrollView>
        <View style={[Gutters.smallHPadding]}>
          <Text
            style={[
              Fonts.textRegular,
              Fonts.textBold500,
              Gutters.smallTMargin,
              Fonts.textBlue,
            ]}
          >
            Khách hàng: {khachHang.tenKhachHang}
          </Text>
          <Text style={[Fonts.textSmall]}>
            Số điện thoại: {khachHang.soDienThoai}
          </Text>
          <Text
            style={[
              Fonts.textRegular,
              Fonts.textBold500,
              Gutters.smallTMargin,
              Gutters.tinyBMargin,
            ]}
          >
            Danh sách thuê
          </Text>

          <Text style={[Fonts.textTiny, Fonts.textItalic, Fonts.textError]}>
            *Ngày trả là ngày trả dự kiến
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
                Giá thuê
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textBold,
                  Fonts.textCenter,
                  { flex: 1.3 },
                ]}
              >
                Ngày trả*
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
            {danhSachThue?.data?.map((truyenDuocThue, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  Layout.row,
                  Layout.justifyContentBetween,
                  Gutters.tinyVPadding,
                  Common.roundBottom,
                  {
                    backgroundColor: danhSachCanTra.includes(truyenDuocThue)
                      ? Colors.orange
                      : undefined,
                  },
                ]}
                onPress={() => chonTruyenTra(truyenDuocThue)}
              >
                <Text style={[Fonts.textSmall, { flex: 2 }]}>
                  {truyenDuocThue?.truyen?.tenTruyen}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                  {numberWithCommas(truyenDuocThue.giaThue)}đ
                </Text>
                <Text style={[Fonts.textTiny, Fonts.textCenter, { flex: 1.3 }]}>
                  {truyenDuocThue.ngayPhaiTra &&
                    dateFormatTwo(truyenDuocThue.ngayPhaiTra)}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textRight, { flex: 1 }]}>
                  {numberWithCommas(truyenDuocThue.tongTien)}đ
                </Text>
              </TouchableOpacity>
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
              {numberWithCommas(+tong ?? 0)}đ
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
          onPress={taoHoaDon}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>Tạo hóa đơn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReturnBookDetail;
