import { useTheme } from '@/hooks';
import useDatePicker from '@/hooks/useDatePicker';
import useLoadingGlobal from '@/hooks/useLoadingGlobal';
import { useTinhTienTruyenThueMutation } from '@/services/modules/truyenDuocThue';
import { dateFormat } from '@/utils';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TruyenDuocThue } from 'types/faker';

type Props = {
  chonTruyen: (t: Partial<TruyenDuocThue>) => void;
  ngayThue: string;
  cancel: () => void;
};

const MaTruyenInput = ({ chonTruyen, cancel, ngayThue }: Props) => {
  const { Layout, Gutters, Fonts, Common } = useTheme();
  const [ngayTra, setNgayTra] = useState(new Date());
  const [maTruyen, setMaTruyen] = useState('');
  const [errorMessage, setErrMsg] = useState<string>();

  const [handleTinhTien] = useTinhTienTruyenThueMutation({});

  const loading = useLoadingGlobal();
  const datePicker = useDatePicker();

  const selectDate = () => {
    datePicker?.toggle?.(true, 'datetime', date => {
      if (date) {
        setNgayTra(date);
      }
    });
  };

  const xacNhan = () => {
    if (maTruyen.trim() === '') {
      setErrMsg('Chưa nhập mã truyện');
      return;
    }
    loading?.toogleLoading?.(true, 'tinh tien');
    handleTinhTien({
      maTruyen: maTruyen,
      ngayPhaiTra: ngayTra.toISOString(),
      ngayThue: ngayThue,
    })
      .unwrap()
      .then(data => {
        const truyenThue = data?.data;
        if (truyenThue) {
          chonTruyen(truyenThue);
          cancel();
        } else {
          setErrMsg('Không tìm thấy truyện này');
        }
      })
      .finally(() => {
        loading?.toogleLoading?.(false, 'tinh tien');
      });
  };

  return (
    <View style={[]}>
      <Text style={[Fonts.textRegular, Fonts.textBold]}>Quét truyện</Text>
      <Text style={[Fonts.textSmall, Fonts.textBold500, Gutters.tinyTMargin]}>
        Mã truyện
      </Text>
      <TextInput
        style={[Common.input.common, Common.backgroundButton]}
        placeholder="Nhập mã truyện"
        value={maTruyen}
        onChangeText={t => {
          setMaTruyen(t);
          if (t?.length !== 0) {
            setErrMsg(undefined);
          }
        }}
      />
      {errorMessage && (
        <Text style={[Fonts.textTiny, Fonts.textError]}>{errorMessage}</Text>
      )}
      <Text style={[Fonts.textSmall, Fonts.textBold500, Gutters.tinyTMargin]}>
        Ngày trả
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
          onPress={cancel}
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
  );
};

export default MaTruyenInput;
