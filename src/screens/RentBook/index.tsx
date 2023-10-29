import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Header, Search } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';

const RentBook = ({}: ApplicationScreenProps) => {
  const { Layout, Common, Fonts, Gutters } = useTheme();

  return (
    <View style={[Layout.fill]}>
      <Header title="Tạo phiếu mượn" isMenu />
      <ScrollView>
        <View style={[Gutters.smallHPadding]}>
          <Text
            style={[Fonts.textRegular, Fonts.textBold500, Gutters.smallTMargin]}
          >
            Người thuê
          </Text>
          <Search placeholder="Tìm khách hàng" />
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.smallHPadding,
            ]}
          >
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>
              Nguyễn Văn Bách
            </Text>
            {/* <Text style={[Fonts.textSmall, Fonts.textBold, Fonts.textBlue]}>
              Đổi
            </Text> */}
          </View>

          <Text
            style={[Fonts.textRegular, Fonts.textBold500, Gutters.smallTMargin]}
          >
            Danh sách thuê
          </Text>
          <Search placeholder="Tìm khách truyện" />
          <View style={[Gutters.smallHPadding, Gutters.tinyVMargin]}>
            <View style={[Layout.row, Layout.justifyContentBetween]}>
              <Text style={[Fonts.textSmall, Fonts.textBold]}>Tên</Text>
              <Text style={[Fonts.textSmall, Fonts.textBold]}>Giá</Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVMargin,
              ]}
            >
              <Text style={[Fonts.textSmall]}>Tấm cám</Text>
              <Text style={[Fonts.textSmall]}>3.000đ</Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVMargin,
              ]}
            >
              <Text style={[Fonts.textSmall]}>Nghìn lẻ một đêm</Text>
              <Text style={[Fonts.textSmall]}>5.000đ</Text>
            </View>
          </View>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.tinyTMargin,
            ]}
          >
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Tổng</Text>
            <Text
              style={[
                Fonts.textSmall,
                Fonts.textBold500,
                Gutters.smallTMargin,
                Fonts.textRed,
              ]}
            >
              8.000đ
            </Text>
          </View>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <Text style={[Fonts.textSmall, { fontStyle: 'italic' }]}>
              Ngày thuê: 20/08/2023
            </Text>
          </View>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <Text style={[Fonts.textSmall, { fontStyle: 'italic' }]}>
              Ghi chú: no
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
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>
            In phiếu mượn
          </Text>
        </TouchableOpacity>
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
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>Tạo phiếu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RentBook;
