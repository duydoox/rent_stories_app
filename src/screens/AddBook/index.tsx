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
import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { Truyen } from 'types/faker';
import { doFaker } from '@/store/faker';
import { goBack } from '@/navigators/utils';
import { randomId } from '@/utils';

const AddBook = ({ route }: AddBookScreenProps) => {
  const { Layout, Gutters, Fonts, Common, Colors } = useTheme();
  const { type, truyen: oldTruyen } = route.params;

  const titleHeader = type === 'ADD' ? 'Thêm truyện' : 'Sửa truyện';
  const textButton = type === 'ADD' ? 'Thêm' : 'Sửa';

  const [truyen, setTruyen] = useState<Partial<Truyen>>(
    oldTruyen ?? { id: randomId() },
  );

  const { truyens } = useAppSelector(state => state.faker);
  const dispatch = useDispatch();

  const themTruyen = () => {
    dispatch(
      doFaker({
        truyens: [...(truyens ?? []), truyen],
      }),
    );
  };

  const suaTruyen = () => {
    const truyenDaSuas = truyens?.map(v => (v.id === truyen.id ? truyen : v));
    dispatch(
      doFaker({
        truyens: truyenDaSuas,
      }),
    );
  };

  const xoaTruyen = () => {
    const truyenSauXoa = truyens?.filter(v => v.id !== truyen.id);
    dispatch(
      doFaker({
        truyens: truyenSauXoa,
      }),
    );
    goBack();
  };

  const submit = () => {
    if (type === 'ADD') {
      themTruyen();
    } else {
      suaTruyen();
    }
    goBack();
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
            onPress={xoaTruyen}
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
