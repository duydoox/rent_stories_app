/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Header } from '../../components';
import { StatisticDetailScreenProps } from '../../../@types/navigation';
import { dateFormat, dateFormatTwo, numberWithCommas } from '@/utils';

import { useGetChiTietThongKeQuery } from '@/services/modules/truyenDuocTra';

const StatisticDetail = ({ route }: StatisticDetailScreenProps) => {
  const { Layout, Gutters, Fonts, Common } = useTheme();
  const { tenTruyen, ...req } = route.params;

  const { data: dataChiTiet } = useGetChiTietThongKeQuery({ ...req });

  return (
    <View style={[Layout.fill]}>
      <Header title="Chi tiết thống kê" />
      <ScrollView>
        <View style={[Gutters.smallHPadding]}>
          <Text
            style={[
              Fonts.textRegular,
              Fonts.textBold500,
              Gutters.smallTMargin,
              Gutters.tinyBMargin,
            ]}
          >
            Thời gian
          </Text>
          <Text style={[Fonts.textSmall]}>
            Từ : {dateFormat(req.ngayBatDau)}
          </Text>
          <Text style={[Fonts.textSmall]}>
            Đến: {dateFormat(req.ngayKetThuc)}
          </Text>
          <Text
            style={[
              Fonts.textRegular,
              Fonts.textBold500,
              Gutters.smallTMargin,
              Gutters.tinyBMargin,
            ]}
          >
            Thống kê truyện {tenTruyen}
          </Text>
          <View>
            <View
              style={[
                Layout.row,
                Common.backgroundPrimary,
                Gutters.tinyVPadding,
              ]}
            >
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textCenter,
                  Fonts.textBold500,
                  { flex: 1 },
                ]}
              >
                Khách hàng
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textCenter,
                  Fonts.textBold500,
                  { flex: 1.2 },
                ]}
              >
                Ngày mượn
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textCenter,
                  Fonts.textBold500,
                  { flex: 1 },
                ]}
              >
                Ngày trả
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textCenter,
                  Fonts.textBold500,
                  { flex: 1 },
                ]}
              >
                Tổng trả
              </Text>
            </View>
            {dataChiTiet?.data?.map((item, index) => (
              <View style={[Layout.row, Gutters.tinyVPadding]} key={index}>
                <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                  {item.truyenDuocThue.phieuThue.khachHang?.tenKhachHang}
                </Text>
                <Text style={[Fonts.textTiny, Fonts.textCenter, { flex: 1.2 }]}>
                  {item.truyenDuocThue.ngayThue &&
                    dateFormatTwo(item.truyenDuocThue.ngayThue)}
                </Text>
                <Text style={[Fonts.textTiny, Fonts.textCenter, { flex: 1 }]}>
                  {item.ngayTra && dateFormatTwo(item.ngayTra)}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                  {numberWithCommas(item.tienDaTra ?? 0)}đ
                </Text>
              </View>
            ))}
            {dataChiTiet?.data?.length === 0 && (
              <Text
                style={[
                  Fonts.textCenter,
                  Fonts.textSmall,
                  Gutters.largeTMargin,
                ]}
              >
                Không có dữ liệu thống kê
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StatisticDetail;
