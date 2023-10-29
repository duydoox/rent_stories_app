import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { Header, Search } from '@/components';

const BookManager = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters, Fonts, Common } = useTheme();

  return (
    <View style={[Layout.fill]}>
      <Header title="Quản lý truyện" isMenu />
      <ScrollView>
        <View style={[Gutters.smallHPadding]}>
          <Search />
          <View>
            <TouchableOpacity
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVPadding,
              ]}
              onPress={() => navigation.navigate('AddBook', { type: 'EDIT' })}
            >
              <Text style={[Fonts.textRegular]}>Tấm cám</Text>
              <Text style={[Fonts.textSmall, Fonts.textBold, Fonts.textBlue]}>
                Sửa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVPadding,
              ]}
              onPress={() => navigation.navigate('AddBook', { type: 'EDIT' })}
            >
              <Text style={[Fonts.textRegular]}>Nghìn lẻ một đêm</Text>
              <Text style={[Fonts.textSmall, Fonts.textBold, Fonts.textBlue]}>
                Sửa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVPadding,
              ]}
              onPress={() => navigation.navigate('AddBook', { type: 'EDIT' })}
            >
              <Text style={[Fonts.textRegular]}>Chiếc lược ngà</Text>
              <Text style={[Fonts.textSmall, Fonts.textBold, Fonts.textBlue]}>
                Sửa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVPadding,
              ]}
              onPress={() => navigation.navigate('AddBook', { type: 'EDIT' })}
            >
              <Text style={[Fonts.textRegular]}>Cổ tích đêm khuya</Text>
              <Text style={[Fonts.textSmall, Fonts.textBold, Fonts.textBlue]}>
                Sửa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVPadding,
              ]}
              onPress={() => navigation.navigate('AddBook', { type: 'EDIT' })}
            >
              <Text style={[Fonts.textRegular]}>Thời gian trống</Text>
              <Text style={[Fonts.textSmall, Fonts.textBold, Fonts.textBlue]}>
                Sửa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVPadding,
              ]}
              onPress={() => navigation.navigate('AddBook', { type: 'EDIT' })}
            >
              <Text style={[Fonts.textRegular]}>Truyện kể bé nghe</Text>
              <Text style={[Fonts.textSmall, Fonts.textBold, Fonts.textBlue]}>
                Sửa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVPadding,
              ]}
              onPress={() => navigation.navigate('AddBook', { type: 'EDIT' })}
            >
              <Text style={[Fonts.textRegular]}>Truyền thuyết thạch sanh</Text>
              <Text style={[Fonts.textSmall, Fonts.textBold, Fonts.textBlue]}>
                Sửa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.tinyVPadding,
              ]}
              onPress={() => navigation.navigate('AddBook', { type: 'EDIT' })}
            >
              <Text style={[Fonts.textRegular]}>Thợ săn</Text>
              <Text style={[Fonts.textSmall, Fonts.textBold, Fonts.textBlue]}>
                Sửa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          Layout.selfCenter,
          Common.backgroundPrimary,
          Gutters.smallVPadding,
          Gutters.regularHPadding,
          Gutters.smallHMargin,
          Common.radiusTiny,
          Gutters.smallBMargin,
          Layout.selfEnd,
        ]}
        onPress={() => navigation.navigate('AddBook', { type: 'ADD' })}
      >
        <Text style={[Fonts.textSmall, Fonts.textBold500]}>Thêm truyện</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookManager;
