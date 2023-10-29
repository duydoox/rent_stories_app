import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Header, Search } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';

const ReturnBook = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Fonts, Common, Gutters } = useTheme();

  return (
    <View style={[Layout.fill]}>
      <Header title="Trả sách" isMenu />
      <ScrollView>
        <View style={[Gutters.smallHPadding]}>
          <Text
            style={[Fonts.textRegular, Fonts.textBold500, Gutters.smallTMargin]}
          >
            Người thuê
          </Text>
          <Search placeholder="Tìm kiếm khách hàng" />
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

          <View style={[Gutters.smallHPadding, Gutters.tinyVMargin]}>
            <View style={[Layout.row, Layout.justifyContentBetween]}>
              <Text style={[Fonts.textSmall, Fonts.textBold]}>Tên</Text>
              <Text style={[Fonts.textSmall, Fonts.textBold]}>Trạng thái</Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVMargin,
              ]}
            >
              <Text style={[Fonts.textSmall]}>Tấm cám: 3.000đ</Text>
              <Text style={[Fonts.textSmall, Fonts.textBlue]}>Đã trả</Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVMargin,
              ]}
            >
              <Text style={[Fonts.textSmall]}>Nghìn lẻ một đêm: 5000đ</Text>
              <Text style={[Fonts.textSmall, Fonts.textRed]}>Trả</Text>
            </View>
          </View>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.tinyTMargin,
            ]}
          >
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Đã trả</Text>
            <Text style={[Fonts.textSmall, Fonts.textBold500, Fonts.textBlue]}>
              3.000đ
            </Text>
          </View>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Còn lại</Text>
            <Text
              style={[
                Fonts.textSmall,
                Fonts.textBold500,
                Gutters.smallTMargin,
                Fonts.textRed,
              ]}
            >
              5.000đ
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
          onPress={() => navigation.navigate('Bill')}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>Tạo hóa đơn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReturnBook;
