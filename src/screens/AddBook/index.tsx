import React, { useState } from 'react';
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
import { Truyen } from 'types/faker';
import { goBack } from '@/navigators/utils';
import {
  useSuaTruyenMutation,
  useThemTruyenMutation,
  useXoaTruyenMutation,
} from '@/services/modules/truyen';
import useLoadingGlobal from '@/hooks/useLoadingGlobal';
import Toast from 'react-native-toast-message';
import useAlert from '@/hooks/useAlert';

const AddBook = ({ route }: AddBookScreenProps) => {
  const { Layout, Gutters, Fonts, Common, Colors } = useTheme();
  const { type, truyen: oldTruyen } = route.params;

  const titleHeader = type === 'ADD' ? 'Thêm truyện' : 'Sửa truyện';
  const textButton = type === 'ADD' ? 'Thêm' : 'Sửa';

  const [truyen, setTruyen] = useState<Partial<Truyen>>(oldTruyen ?? {});

  const [handleThemTruyenApi] = useThemTruyenMutation({});
  const [handleSuaTruyen] = useSuaTruyenMutation({});
  const [handleXoaTruyen] = useXoaTruyenMutation({});

  const loading = useLoadingGlobal();
  const alert = useAlert();

  const validation = () => {
    if (truyen.tenTruyen?.trim() === '') {
      return 'Vui lòng nhập tên';
    } else if (!truyen.soLuong) {
      return 'Vui lòng nhập số lượng';
    } else if (!truyen.giaThue) {
      return 'Vui lòng nhập giá thuê';
    }
    return false;
  };

  const themTruyen = () => {
    const appraised = validation();
    if (appraised) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: appraised,
      });
      return;
    }
    loading?.toogleLoading?.(true, 'them truen');
    handleThemTruyenApi({
      giaThue: truyen.giaThue ?? 0,
      soLuong: truyen.soLuong ?? 0,
      tenTruyen: truyen.tenTruyen ?? '',
      ghiChu: truyen.ghiChu,
      namSanXuat: truyen.namSanXuat,
      tacGia: truyen.tacGia,
    })
      .unwrap()
      .then(() => {
        goBack();
        Toast.show({
          type: 'success',
          text1: 'Thông báo',
          text2: 'Thêm truyện thành công!',
        });
      })
      .finally(() => {
        loading?.toogleLoading?.(false, 'them truen');
      });
  };

  const suaTruyen = () => {
    const appraised = validation();
    if (appraised) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: appraised,
      });
      return;
    }
    loading?.toogleLoading?.(true, 'sua truen');
    handleSuaTruyen({
      maTruyen: truyen.maTruyen ?? '',
      giaThue: truyen.giaThue ?? 0,
      soLuong: truyen.soLuong ?? 0,
      tenTruyen: truyen.tenTruyen ?? '',
      ghiChu: truyen.ghiChu,
      namSanXuat: truyen.namSanXuat,
      tacGia: truyen.tacGia,
    })
      .unwrap()
      .then(() => {
        goBack();
        Toast.show({
          type: 'success',
          text1: 'Thông báo',
          text2: 'Sửa truyện thành công!',
        });
      })
      .finally(() => {
        loading?.toogleLoading?.(false, 'sua truen');
      });
  };

  const xoaTruyen = () => {
    loading?.toogleLoading?.(true, 'xoa truen');
    handleXoaTruyen({
      maTruyen: truyen.maTruyen ?? '',
    })
      .unwrap()
      .then(() => {
        goBack();
        Toast.show({
          type: 'success',
          text1: 'Thông báo',
          text2: 'Đã xóa truyện!',
        });
      })
      .finally(() => {
        loading?.toogleLoading?.(false, 'xoa truen');
      });
  };

  const xacNhanXoa = () => {
    alert('Thông báo', 'Bạn có chắc muốn xóa không?', [
      {
        text: 'Không',
        type: 'cancel',
      },
      {
        text: 'Có',
        onPress() {
          xoaTruyen();
        },
      },
    ]);
  };

  const submit = () => {
    if (type === 'ADD') {
      themTruyen();
    } else {
      suaTruyen();
    }
  };

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
              value={truyen.tenTruyen ?? ''}
              onChangeText={text => setTruyen({ ...truyen, tenTruyen: text })}
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
              value={String(truyen.namSanXuat ?? '')}
              onChangeText={text => setTruyen({ ...truyen, namSanXuat: +text })}
            />
          </View>

          <View style={[Gutters.smallBMargin]}>
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Số lượng</Text>
            <TextInput
              placeholder="Nhập số lượng"
              placeholderTextColor={Colors.textGray200}
              style={[
                Common.input.outlineRounded,
                Gutters.tinyTMargin,
                Common.input.text,
              ]}
              keyboardType="numeric"
              value={String(truyen.soLuong ?? '')}
              onChangeText={text => setTruyen({ ...truyen, soLuong: +text })}
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
              value={truyen.tacGia ?? ''}
              onChangeText={text => setTruyen({ ...truyen, tacGia: text })}
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
              value={String(truyen.giaThue ?? '')}
              onChangeText={text => setTruyen({ ...truyen, giaThue: +text })}
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
            onPress={xacNhanXoa}
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
          onPress={submit}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>{textButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBook;
