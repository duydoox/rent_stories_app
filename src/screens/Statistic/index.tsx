/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Header } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { dayFormat, numberWithCommas } from '@/utils';
import useDatePicker from '@/hooks/useDatePicker';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useLazyGetThongKeQuery } from '@/services/modules/truyenDuocTra';

const Statistic = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters, Common, Fonts, Colors, MetricsSizes } = useTheme();
  const [time, setTime] = useState({
    start: new Date(),
    end: new Date(),
  });

  const [handleThongKe, { data: dataThongKe }] = useLazyGetThongKeQuery({});

  const datePicker = useDatePicker();

  const selectDate = (type: 'start' | 'end') => {
    datePicker?.toggle?.(true, 'date', date => {
      if (date) {
        setTime({ ...time, [type]: date });
      }
    });
  };

  const thongKe = () => {
    handleThongKe({
      ngayBatDau: time.start.toISOString(),
      ngayKetThuc: time.end.toISOString(),
    });
  };

  return (
    <View style={[Layout.fill]}>
      <Header title="Thống kê" isMenu />
      <ScrollView>
        <Text
          style={[
            Fonts.textRegular,
            Fonts.textBold500,
            Gutters.smallTMargin,
            Gutters.smallHPadding,
          ]}
        >
          Thời gian thống kê
        </Text>
        <View style={[Layout.row]}>
          <TouchableOpacity
            style={[
              Common.shadow,
              Layout.fill,
              Gutters.tinyVPadding,
              Gutters.tinyHPadding,
              Common.radiusSmall,
              Gutters.tinyTMargin,
              Gutters.smallLMargin,
              Gutters.tinyRMargin,
              { backgroundColor: Colors.inputBackground },
            ]}
            onPress={() => selectDate('start')}
          >
            <Text style={[Fonts.textSmall]}>Từ: {dayFormat(time.start)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Common.shadow,
              Layout.fill,
              Gutters.tinyVPadding,
              Gutters.tinyHPadding,
              Common.radiusSmall,
              Gutters.tinyTMargin,
              Gutters.smallRMargin,
              Gutters.tinyLMargin,
              { backgroundColor: Colors.inputBackground },
            ]}
            onPress={() => selectDate('end')}
          >
            <Text style={[Fonts.textSmall]}>Đến: {dayFormat(time.end)}</Text>
          </TouchableOpacity>
        </View>
        <View style={[Gutters.smallHPadding]}>
          <Text
            style={[Fonts.textRegular, Fonts.textBold500, Gutters.smallTMargin]}
          >
            Loại thống kê
          </Text>
          <Menu>
            <MenuTrigger style={[Gutters.tinyTMargin]}>
              <View
                style={[
                  Common.shadow,
                  Gutters.tinyVPadding,
                  Gutters.tinyHPadding,
                  Common.radiusSmall,
                  { backgroundColor: Colors.inputBackground },
                ]}
              >
                <Text style={[Fonts.textSmall]}>
                  Thống kê theo số lượt mượn
                </Text>
              </View>
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={[
                Gutters.tinyVPadding,
                Gutters.smallHPadding,
                {
                  marginTop: MetricsSizes.large * 1.5,
                  width: MetricsSizes.fullWidth - MetricsSizes.small * 2,
                },
              ]}
            >
              <MenuOption onSelect={() => {}}>
                <Text style={[Fonts.textSmall]}>
                  Thống kê theo số lượt mượn
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
          <Text
            style={[
              Fonts.textRegular,
              Fonts.textBold500,
              Gutters.smallTMargin,
              Gutters.tinyBMargin,
            ]}
          >
            Thống kê
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
                  { flex: 0.5 },
                ]}
              >
                STT
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textCenter,
                  Fonts.textBold500,
                  { flex: 1.2 },
                ]}
              >
                Tên
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textCenter,
                  Fonts.textBold500,
                  { flex: 1 },
                ]}
              >
                Lượt mượn
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textCenter,
                  Fonts.textBold500,
                  { flex: 1 },
                ]}
              >
                Tổng tiền
              </Text>
            </View>
            {dataThongKe?.data?.map((item, index) => (
              <TouchableOpacity
                style={[Layout.row, Gutters.tinyVPadding]}
                key={index}
                onPress={() =>
                  navigation.navigate('StatisticDetail', {
                    maTruyen: item.maTruyen,
                    ngayBatDau: time.start.toISOString(),
                    ngayKetThuc: time.end.toISOString(),
                    tenTruyen: item.tenTruyen,
                  })
                }
              >
                <Text
                  style={[Fonts.textSmall, Fonts.textCenter, { flex: 0.5 }]}
                >
                  {index + 1}
                </Text>
                <Text
                  style={[Fonts.textSmall, Fonts.textCenter, { flex: 1.2 }]}
                >
                  {item.tenTruyen}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                  {item.soLuong}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                  {numberWithCommas(item.tienDaTra ?? 0)}đ
                </Text>
              </TouchableOpacity>
            ))}
            {dataThongKe?.data?.length === 0 && (
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
        onPress={thongKe}
      >
        <Text style={[Fonts.textSmall, Fonts.textBold500]}>Thống kê</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Statistic;
