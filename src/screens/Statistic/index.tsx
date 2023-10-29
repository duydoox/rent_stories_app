import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Header } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';

const Statistic = ({}: ApplicationScreenProps) => {
  const { Layout, Gutters, Common, Fonts, Colors } = useTheme();

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
          <View
            style={[
              Layout.fill,
              Gutters.tinyVPadding,
              Gutters.tinyHPadding,
              Common.radiusSmall,
              Gutters.tinyTMargin,
              Gutters.tinyHMargin,
              { backgroundColor: Colors.inputBackground },
            ]}
          >
            <Text style={[Fonts.textSmall]}>Từ: 20/03/2023</Text>
          </View>
          <View
            style={[
              Layout.fill,
              Gutters.tinyVPadding,
              Gutters.tinyHPadding,
              Common.radiusSmall,
              Gutters.tinyTMargin,
              Gutters.tinyHMargin,
              { backgroundColor: Colors.inputBackground },
            ]}
          >
            <Text style={[Fonts.textSmall]}>Đến: 20/03/2023</Text>
          </View>
        </View>
        <View style={[Gutters.smallHPadding]}>
          <Text
            style={[Fonts.textRegular, Fonts.textBold500, Gutters.smallTMargin]}
          >
            Loại thống kê
          </Text>
          <View
            style={[
              Gutters.tinyVPadding,
              Gutters.tinyHPadding,
              Common.radiusSmall,
              Gutters.tinyTMargin,
              { backgroundColor: Colors.inputBackground },
            ]}
          >
            <Text style={[Fonts.textSmall]}>Thống kê theo số lượt mượn</Text>
          </View>
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
            <View style={[Layout.row]}>
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
            <View style={[Layout.row]}>
              <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 0.5 }]}>
                1
              </Text>
              <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1.2 }]}>
                Tấm cám
              </Text>
              <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                100
              </Text>
              <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                300.000đ
              </Text>
            </View>
            <View style={[Layout.row]}>
              <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 0.5 }]}>
                2
              </Text>
              <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1.2 }]}>
                Nghìn lẻ một đêm
              </Text>
              <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                80
              </Text>
              <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                400.000đ
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Statistic;
