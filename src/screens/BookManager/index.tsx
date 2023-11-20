import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { Header, Search } from '@/components';
import { Truyen } from 'types/faker';
import { numberWithCommas } from '@/utils';
import { useTimKiemTruyenQuery } from '@/services/modules/truyen';
import { RefreshControl } from 'react-native';

const BookManager = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters, Fonts, Common, Images, Colors } = useTheme();
  const [keyword, setKeyword] = useState('');

  const {
    data: truyens,
    isLoading,
    isFetching,
    refetch,
  } = useTimKiemTruyenQuery({
    keyword: keyword,
  });

  const truyenShow = truyens?.data;

  const suaTruyen = (truyen: Partial<Truyen>) => {
    navigation.navigate('AddBook', { type: 'EDIT', truyen: truyen });
  };

  const themTruyen = () => {
    navigation.navigate('AddBook', { type: 'ADD' });
  };

  return (
    <View style={[Layout.fill]}>
      <Header title="Quản lý truyện" isMenu />
      <Search
        showMenu={false}
        onSearch={e => {
          setKeyword(e ?? '');
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        <View>
          <View>
            {truyenShow?.map((v, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  Gutters.tinyVPadding,
                  Common.backgroundWhite,
                  Gutters.tinyVMargin,
                  Gutters.smallHPadding,
                ]}
                onPress={() => suaTruyen(v)}
              >
                <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
                  <Text
                    style={[
                      Fonts.textSmall,
                      Fonts.textPrimary,
                      Fonts.textBold500,
                    ]}
                  >
                    Mã truyện: {v.maTruyen}
                  </Text>
                  <Image
                    source={Images.icons.pencil}
                    style={[Common.iconSize, { tintColor: Colors.primary }]}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[Fonts.textSmall, Fonts.textBlue]}>
                  Tên truyện: {v.tenTruyen}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textOrange]}>
                  Số lượng: {v.soLuong}
                </Text>
                <Text style={[Fonts.textSmall]}>
                  Giá: {numberWithCommas(v.giaThue ?? 0)}đ
                </Text>
              </TouchableOpacity>
            ))}
            {truyenShow?.length === 0 && (
              <Text
                style={[Fonts.textSmall, Fonts.textError, Fonts.textCenter]}
              >
                Không tìm thấy truyện nào
              </Text>
            )}
            {isLoading && (
              <ActivityIndicator
                color={Colors.primary}
                style={[Layout.center]}
              />
            )}
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
