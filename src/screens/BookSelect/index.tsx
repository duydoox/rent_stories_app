import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { BookSelectScreenProps } from '../../../@types/navigation';
import { Header, Search } from '@/components';
import { useAppSelector } from '@/store';
import { Truyen } from 'types/faker';
import { numberWithCommas } from '@/utils';
import { goBack } from '@/navigators/utils';

const BookSelect = ({ route }: BookSelectScreenProps) => {
  const { Layout, Gutters, Fonts, Common } = useTheme();
  const { chooseBook } = route.params;

  const { truyens } = useAppSelector(state => state.faker);

  const truyenShow = truyens;

  const chonTruyen = (truyen: Partial<Truyen>) => {
    chooseBook(truyen);
    goBack();
  };

  return (
    <View style={[Layout.fill]}>
      <Header title="Chọn truyện thuê" isMenu={false} />
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
                onPress={() => chonTruyen(v)}
              >
                <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
                  <Text style={[Fonts.textRegular]}>{v.tenTruyen}</Text>
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
    </View>
  );
};

export default BookSelect;
