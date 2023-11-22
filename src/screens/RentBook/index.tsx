/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks';
import { CustomModal, Header } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { KhachHang, TruyenDuocThue } from 'types/faker';
import { dateFormat, dateFormatTwo, numberWithCommas } from '@/utils';
import MaTruyenInput from './components/MaTruyenInput';
import KhachHangInput from './components/KhachHangInput';
import { useThemPhieuThueMutation } from '@/services/modules/phieuThue';
import useLoadingGlobal from '@/hooks/useLoadingGlobal';
import Toast from 'react-native-toast-message';
import { resetNavigate } from '@/navigators/utils';

const RentBook = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Common, Fonts, Gutters, Images, Colors } = useTheme();

  const [showModal, setShowModal] = useState<'KH' | 'TRUYEN'>();
  const [khachHang, setKhachHang] = useState<KhachHang>();
  const [truyenDuocThues, setTruyenDuocThues] = useState<
    Partial<TruyenDuocThue>[]
  >([]);
  const [ngayThue] = useState(new Date());
  const [ghiChu, setGhiChu] = useState('');

  const [handleTaoPhieuThue] = useThemPhieuThueMutation({});

  const loading = useLoadingGlobal();

  const tong = truyenDuocThues?.reduce((pre, item) => {
    return pre + (item?.tongTien ?? 0);
  }, 0);

  const chonTruyen = (truyenThue: Partial<TruyenDuocThue>) => {
    setTruyenDuocThues(pre => [...pre, truyenThue]);
  };

  const submit = () => {
    if (!khachHang?.maKhachHang) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Vui lòng chọn khách hàng!',
      });
      return;
    } else if (truyenDuocThues?.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Vui lòng chọn ít nhất 1 truyện thuê!',
      });
      return;
    }
    loading?.toogleLoading?.(true, 'tao phieu');
    handleTaoPhieuThue({
      maKhachHang: khachHang.maKhachHang,
      ghiChu,
      dsTruyenDuocThue: truyenDuocThues.map(pre => ({
        maTruyen: pre.truyen?.maTruyen ?? '',
        ngayPhaiTra: pre.ngayPhaiTra ?? '',
        ngayThue: ngayThue.toISOString(),
      })),
    })
      .unwrap()
      .then(() => {
        resetNavigate([{ name: 'Main' }]);
        Toast.show({
          type: 'success',
          text1: 'Thông báo',
          text2: 'Đã tạo phiếu thuê thành công!',
        });
      })
      .finally(() => {
        loading?.toogleLoading?.(false, 'tao phieu');
      });
  };

  return (
    <View style={[Layout.fill]}>
      <Header title="Tạo phiếu mượn" isMenu />
      <ScrollView>
        <View
          style={[
            Gutters.smallHMargin,
            Gutters.smallHPadding,
            Common.shadow,
            Common.backgroundCommon,
            Common.radiusSmall,
            Gutters.smallVMargin,
            Gutters.smallVPadding,
          ]}
        >
          <Text style={[Fonts.textRegular, Fonts.textBold500]}>Khách hàng</Text>
          <View style={[Gutters.smallHPadding, Gutters.tinyVMargin]}>
            {khachHang ? (
              <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
                <View style={[Layout.row]}>
                  <Image
                    source={Images.avatar.male_5}
                    style={[Common.iconSize, Gutters.tinyRMargin]}
                    resizeMode="contain"
                  />
                  <View>
                    <Text style={[Fonts.textSmall]}>
                      {khachHang.tenKhachHang}
                    </Text>
                    <Text style={[Fonts.textSmall]}>
                      {khachHang.soDienThoai}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setKhachHang(undefined)}>
                  <Image
                    source={Images.icons.remove}
                    style={[Common.regularSize]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
                <Text style={[Fonts.textSmall, Fonts.textRed]}>
                  Chưa chọn khách hàng.
                </Text>
                <View style={[Layout.rowHCenter]}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AddCustomer', {
                        chooseCustomer: setKhachHang,
                      })
                    }
                  >
                    <Image
                      source={Images.icons.add}
                      style={[
                        Common.regularSize,
                        Gutters.regularRMargin,
                        { tintColor: Colors.blue },
                      ]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowModal('KH')}>
                    <Image
                      source={Images.icons.barcode_scanner}
                      style={[Common.regularSize, { tintColor: Colors.blue }]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
        <View
          style={[
            Gutters.smallHMargin,
            Gutters.smallHPadding,
            Common.shadow,
            Common.backgroundCommon,
            Common.radiusSmall,
            Gutters.smallBMargin,
            Gutters.smallVPadding,
          ]}
        >
          <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
            <Text style={[Fonts.textRegular, Fonts.textBold500]}>
              Danh sách thuê
            </Text>
            <View style={[Layout.rowHCenter]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BookSelect', {
                    chooseBook: chonTruyen,
                    ngayThue: ngayThue.toISOString(),
                  })
                }
              >
                <Image
                  source={Images.icons.add}
                  style={[
                    Common.regularSize,
                    Gutters.regularRMargin,
                    { tintColor: Colors.blue },
                  ]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModal('TRUYEN')}>
                <Image
                  source={Images.icons.barcode_scanner}
                  style={[Common.regularSize, { tintColor: Colors.blue }]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[Gutters.tinyVMargin]}>
            <View
              style={[
                Layout.row,
                Gutters.tinyVPadding,
                Common.backgroundPrimary,
              ]}
            >
              <Text style={[Fonts.textSmall, Fonts.textBold, { flex: 2 }]}>
                Tên
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textBold,
                  Fonts.textCenter,
                  { flex: 1 },
                ]}
              >
                Giá
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textBold,
                  Fonts.textCenter,
                  { flex: 1.2 },
                ]}
              >
                Ngày trả
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  Fonts.textBold,
                  Fonts.textRight,
                  { flex: 1 },
                ]}
              >
                Tổng
              </Text>
            </View>
            {truyenDuocThues?.map((truyenDuocThue, index) => (
              <View
                key={index}
                style={[
                  Layout.rowHCenter,
                  Layout.justifyContentBetween,
                  Gutters.tinyVPadding,
                  Common.roundBottom,
                ]}
              >
                <Text style={[Fonts.textSmall, { flex: 2 }]}>
                  {truyenDuocThue?.truyen?.tenTruyen}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                  {numberWithCommas(truyenDuocThue.giaThue ?? 0)}
                </Text>
                <Text style={[Fonts.textTiny, Fonts.textCenter, { flex: 1.2 }]}>
                  {truyenDuocThue?.ngayPhaiTra &&
                    dateFormatTwo(truyenDuocThue?.ngayPhaiTra)}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textRight, { flex: 1 }]}>
                  {numberWithCommas(truyenDuocThue.tongTien ?? 0)}đ
                </Text>
              </View>
            ))}
          </View>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.tinyTMargin,
            ]}
          >
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Tổng</Text>
            <Text style={[Fonts.textSmall, Fonts.textBold500, Fonts.textRed]}>
              {numberWithCommas(+tong.toFixed())}đ
            </Text>
          </View>
          <View style={[Gutters.smallTMargin]}>
            <Text style={[Fonts.textTiny, Fonts.textItalic]}>
              Ngày thuê: {dateFormat(ngayThue)}
            </Text>
          </View>
          <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
            <Text style={[Fonts.textSmall, Fonts.textItalic]}>Ghi chú: </Text>
            <TextInput
              style={[Common.roundBottom, Layout.fill]}
              multiline
              value={ghiChu}
              onChangeText={setGhiChu}
            />
          </View>
        </View>
      </ScrollView>
      <View style={[Gutters.smallBMargin, Layout.rowReverse]}>
        {/* <TouchableOpacity
          style={[
            Layout.selfCenter,
            Common.backgroundPrimary,
            Gutters.smallVPadding,
            Gutters.regularHPadding,
            Common.radiusTiny,
            Gutters.smallBMargin,
            Gutters.smallRMargin,
          ]}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>
            In phiếu mượn
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[
            Layout.selfCenter,
            Common.backgroundPrimary,
            Gutters.smallVPadding,
            Gutters.regularHPadding,
            Common.radiusTiny,
            Gutters.smallBMargin,
            Gutters.smallRMargin,
          ]}
          onPress={submit}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>Tạo phiếu</Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        visivle={!!showModal}
        onBackButtonPress={() => setShowModal(undefined)}
      >
        <View
          style={[
            Common.backgroundWhite,
            Layout.fullWidth,
            Gutters.largeHMargin,
            Gutters.smallHPadding,
            Gutters.smallVPadding,
            Common.radiusSmall,
          ]}
        >
          {showModal === 'TRUYEN' ? (
            <MaTruyenInput
              chonTruyen={chonTruyen}
              ngayThue={ngayThue.toISOString()}
              cancel={() => setShowModal(undefined)}
            />
          ) : (
            <KhachHangInput
              cancel={() => setShowModal(undefined)}
              chooseCustomer={setKhachHang}
            />
          )}
        </View>
      </CustomModal>
    </View>
  );
};

export default RentBook;
