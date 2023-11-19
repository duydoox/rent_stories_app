import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { Header, Search } from '@/components';
import { useAppSelector } from '@/store';
import { Truyen } from 'types/faker';
import { numberWithCommas } from '@/utils';

const BookManager = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters, Fonts, Common, Images, Colors } = useTheme();

  const { truyens } = useAppSelector(state => state.faker);

  const truyenShow = truyens;

  const suaTruyen = (truyen: Partial<Truyen>) => {
    navigation.navigate('AddBook', { type: 'EDIT', truyen: truyen });
  };

  const themTruyen = () => {
    navigation.navigate('AddBook', { type: 'ADD' });
  };

  return (
    <View style={[Layout.fill]}>
      <Header title="Quản lý truyện" isMenu />
      <View
        style={[
          Gutters.smallHPadding,
          Gutters.smallVMargin,
          Common.backgroundCommon,
        ]}
      >
        <Search />
      </View>
      <ScrollView>
        <View>
          <View>
            {truyenShow?.map((v, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  Gutters.tinyVPadding,
                  Common.backgroundCommon,
                  Gutters.tinyVMargin,
                  Gutters.smallHPadding,
                ]}
                onPress={() => suaTruyen(v)}
              >
                <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
                  <Text style={[Fonts.textRegular]}>{v.tenTruyen}</Text>
                  <Image
                    source={Images.icons.pencil}
                    style={[Common.iconSize, { tintColor: Colors.primary }]}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[Fonts.textTiny, Fonts.textLight]}>
                  Số lượng: {v.soLuong}
                </Text>
                <Text style={[Fonts.textSmall]}>
                  Giá: {numberWithCommas(v.giaThue ?? 0)}đ
                </Text>
              </TouchableOpacity>
            ))}
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
          Gutters.smallVMargin,
          Layout.selfEnd,
        ]}
        onPress={themTruyen}
      >
        <Text style={[Fonts.textSmall, Fonts.textBold500]}>Thêm truyện</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookManager;
