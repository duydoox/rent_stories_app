import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks';
import { AddBookScreenProps } from '../../../@types/navigation';
import { Header } from '@/components';

const AddBook = ({ route }: AddBookScreenProps) => {
  const { Layout, Gutters, Fonts, Common, Colors } = useTheme();
  const { type } = route.params;

  const titleHeader = type === 'ADD' ? 'Thêm truyện' : 'Sửa truyện';
  const textButton = type === 'ADD' ? 'Thêm' : 'Sửa';

  return (
    <View style={[Layout.fill]}>
      <Header title={titleHeader} />
      <ScrollView>
        <View style={[Gutters.smallHPadding, Gutters.regularVMargin]}>
          <View style={[Gutters.smallBMargin]}>
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Tên truyện</Text>
            <TextInput
              placeholder="Nhập tên truyện"
              placeholderTextColor={Colors.textGray200}
              style={[
                Common.input.outlineRounded,
                Gutters.tinyTMargin,
                Common.input.text,
              ]}
            />
          </View>

          <View style={[Gutters.smallBMargin]}>
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>
              Năm sản xuất
            </Text>
            <TextInput
              placeholder="Nhập năm sản xuất"
              placeholderTextColor={Colors.textGray200}
              style={[
                Common.input.outlineRounded,
                Gutters.tinyTMargin,
                Common.input.text,
              ]}
              keyboardType="numeric"
            />
          </View>

          <View style={[Gutters.smallBMargin]}>
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Công ty</Text>
            <TextInput
              placeholder="Nhập tên công ty"
              placeholderTextColor={Colors.textGray200}
              style={[
                Common.input.outlineRounded,
                Gutters.tinyTMargin,
                Common.input.text,
              ]}
            />
          </View>

          <View style={[Gutters.smallBMargin]}>
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Tác giả</Text>
            <TextInput
              placeholder="Nhập tên tác giả"
              placeholderTextColor={Colors.textGray200}
              style={[
                Common.input.outlineRounded,
                Gutters.tinyTMargin,
                Common.input.text,
              ]}
            />
          </View>

          <View style={[Gutters.smallBMargin]}>
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>
              Giá thuê (VND/ngày)
            </Text>
            <TextInput
              placeholder="Nhập giá thuê"
              placeholderTextColor={Colors.textGray200}
              style={[
                Common.input.outlineRounded,
                Gutters.tinyTMargin,
                Common.input.text,
              ]}
              keyboardType="numeric"
            />
          </View>
        </View>
      </ScrollView>
      <View style={[Layout.selfEnd, Layout.row]}>
        {type === 'EDIT' && (
          <TouchableOpacity
            style={[
              Layout.selfEnd,
              Common.backgroundPrimary,
              Gutters.smallVPadding,
              Gutters.regularHPadding,
              Common.radiusTiny,
              Gutters.smallBMargin,
              Gutters.smallHMargin,
            ]}
          >
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Xóa</Text>
          </TouchableOpacity>
        )}
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
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>{textButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBook;
