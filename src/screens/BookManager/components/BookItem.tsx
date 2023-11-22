/* eslint-disable react/require-default-props */
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../hooks';
import { Truyen } from 'types/faker';
import { numberWithCommas } from '@/utils';

const BookItem = ({
  truyen,
  disabled,
  isEditIcon,
  onPress,
}: {
  truyen: Truyen;
  disabled?: boolean;
  isEditIcon?: boolean;
  onPress?: () => void;
}) => {
  const { Layout, Gutters, Fonts, Common, Images, Colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        Gutters.tinyVPadding,
        Common.backgroundWhite,
        Gutters.tinyVMargin,
        Gutters.smallHPadding,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
        <Text style={[Fonts.textSmall, Fonts.textPrimary, Fonts.textBold500]}>
          Mã truyện: {truyen.maTruyen}
        </Text>
        {isEditIcon && (
          <Image
            source={Images.icons.pencil}
            style={[Common.iconSize, { tintColor: Colors.primary }]}
            resizeMode="contain"
          />
        )}
      </View>
      <Text style={[Fonts.textSmall, Fonts.textBlue]}>
        Tên truyện: {truyen.tenTruyen}
      </Text>
      <Text style={[Fonts.textSmall, Fonts.textOrange]}>
        Số lượng: {truyen.soLuong}
      </Text>
      <Text style={[Fonts.textSmall]}>
        Giá: {numberWithCommas(truyen.giaThue ?? 0)}đ
      </Text>
    </TouchableOpacity>
  );
};

export default BookItem;
