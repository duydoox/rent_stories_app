import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { Header, Search } from '@/components';
import { Truyen } from 'types/faker';
import { useTimKiemTruyenQuery } from '@/services/modules/truyen';
import { RefreshControl } from 'react-native';
import { useAppSelector } from '@/store';
import BookItem from './components/BookItem';

const BookManager = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters, Fonts, Common, Colors } = useTheme();
  const [keyword, setKeyword] = useState('');

  const {
    data: truyens,
    isLoading,
    isFetching,
    refetch,
  } = useTimKiemTruyenQuery(
    {
      keyword: keyword,
    },
    { refetchOnMountOrArgChange: true },
  );

  const { nhanVien } = useAppSelector(state => state.auth);

  const isQuanLy = nhanVien?.viTri === 'QL';

  const truyenShow = truyens?.data;

  const suaTruyen = (truyen: Partial<Truyen>) => {
    navigation.navigate('AddBook', { type: 'EDIT', truyen: truyen });
  };

  const themTruyen = () => {
    navigation.navigate('AddBook', { type: 'ADD' });
  };

  return (
    <View style={[Layout.fill]}>
      <Header title={isQuanLy ? 'Quản lý truyện' : 'Danh sách truyện'} isMenu />
      <Search
        showMenu={false}
        onSearch={e => {
          setKeyword(e ?? '');
        }}
      />
      {isFetching && (
        <View>
          <ActivityIndicator color={Colors.primary} />
        </View>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        <View>
          <View>
            {truyenShow?.map((v, i) => (
              <BookItem
                truyen={v}
                key={i}
                onPress={() => suaTruyen(v)}
                disabled={!isQuanLy}
                isEditIcon={isQuanLy}
              />
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
      {isQuanLy && (
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
      )}
    </View>
  );
};

export default BookManager;
