import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks';
import { BookSelectScreenProps } from '../../../@types/navigation';
import { CustomModal, Header, Search } from '@/components';
import { Truyen } from 'types/faker';
import { goBack } from '@/navigators/utils';
import BookItem from '../BookManager/components/BookItem';
import { useTimKiemTruyenQuery } from '@/services/modules/truyen';
import { dateFormat } from '@/utils';
import useDatePicker from '@/hooks/useDatePicker';
import { useTinhTienTruyenThueMutation } from '@/services/modules/truyenDuocThue';
import useLoadingGlobal from '@/hooks/useLoadingGlobal';

const BookSelect = ({ route }: BookSelectScreenProps) => {
  const { Layout, Colors, Common, Fonts, Gutters } = useTheme();
  const { chooseBook, ngayThue } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [truyen, setTruyen] = useState<Truyen>();
  const [ngayTra, setNgayTra] = useState(new Date());

  const { data: truyens, isFetching } = useTimKiemTruyenQuery({
    keyword: keyword,
  });
  const [handleTinhTien] = useTinhTienTruyenThueMutation({});

  const truyenShow = truyens?.data;

  const loading = useLoadingGlobal();
  const datePicker = useDatePicker();

  const chonTruyen = (t: Truyen) => {
    setTruyen(t);
    setShowModal(true);
  };

  const selectDate = () => {
    datePicker?.toggle?.(true, 'datetime', date => {
      if (date) {
        setNgayTra(date);
      }
    });
  };

  const xacNhan = () => {
    if (truyen) {
      loading?.toogleLoading?.(true, 'tinh tien');
      handleTinhTien({
        maTruyen: truyen.maTruyen,
        ngayPhaiTra: ngayTra.toISOString(),
        ngayThue: ngayThue,
      })
        .unwrap()
        .then(data => {
          const truyenThue = data?.data;
          chooseBook(truyenThue);
          goBack();
        })
        .finally(() => {
          loading?.toogleLoading?.(false, 'tinh tien');
        });
    }
    setShowModal(false);
  };

  return (
    <View style={[Layout.fill]}>
      <Header title="Chọn truyện thuê" isMenu={false} />
      <Search
        onSearch={e => {
          setKeyword(e ?? '');
        }}
        showMenu={false}
      />
      {isFetching && (
        <View>
          <ActivityIndicator color={Colors.primary} />
        </View>
      )}
      <ScrollView>
        <View>
          <View>
            {truyenShow?.map((v, i) => (
              <BookItem key={i} truyen={v} onPress={() => chonTruyen(v)} />
            ))}
          </View>
        </View>
      </ScrollView>
      <CustomModal
        visivle={showModal}
        onBackButtonPress={() => {
          setShowModal(false);
        }}
      >
        <View
          style={[
            Common.backgroundWhite,
            Common.radiusSmall,
            Gutters.smallVPadding,
            Gutters.smallHPadding,
            Layout.fullWidth,
            Gutters.regularHMargin,
          ]}
        >
          <Text style={[Fonts.textRegular, Fonts.textBold500]}>
            Chọn ngày trả
          </Text>
          <TouchableOpacity
            style={[
              Common.backgroundButton,
              Common.radiusSmall,
              Gutters.tinyVPadding,
              Gutters.smallHPadding,
              Gutters.smallTMargin,
            ]}
            onPress={selectDate}
          >
            <Text style={[Fonts.textSmall]}>{dateFormat(ngayTra)}</Text>
          </TouchableOpacity>
          <View style={[Layout.row, Layout.selfEnd]}>
            <TouchableOpacity
              style={[
                Layout.selfEnd,
                Gutters.regularTPadding,
                Gutters.tinyBPadding,
              ]}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Text style={[Fonts.textSmall, Fonts.textBold]}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Layout.selfEnd,
                Gutters.regularTPadding,
                Gutters.tinyBPadding,
                Gutters.regularLPadding,
              ]}
              onPress={xacNhan}
            >
              <Text style={[Fonts.textSmall, Fonts.textBold]}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default BookSelect;
