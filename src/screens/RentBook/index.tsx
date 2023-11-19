import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks';
import { Header } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { KhachHang, PhieuThue, TruyenDuocThue } from 'types/faker';
import { dateFormat, numberWithCommas, randomId } from '@/utils';
import useDatePicker from '@/hooks/useDatePicker';
import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { doFaker } from '@/store/faker';

const RentBook = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Common, Fonts, Gutters, Images, Colors } = useTheme();

  const [khachHang, setKhachHang] = useState<Partial<KhachHang>>();
  const [truyenDuocThue, setTruyenDuocThue] = useState<
    Partial<TruyenDuocThue>[]
  >([]);

  const [ngayThue] = useState(new Date());
  const [ngayTra, setNgayTra] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });
  const [ghiChu, setGhiChu] = useState('');

  const { nhanVien } = useAppSelector(state => state.auth);
  const { phieuThues, truyenDuocThues } = useAppSelector(state => state.faker);
  const dispatch = useDispatch();
  const datePicker = useDatePicker();

  const tong = truyenDuocThue?.reduce((pre, item) => {
    return (
      pre +
      (item?.giaThue ?? 0) *
        ((+new Date(item?.ngayTra) - +new Date(item?.ngayThue)) / 24 / 3600000)
    );
  }, 0);

  const chonTruyen = (truyen: Partial<TruyenDuocThue>) => {
    const truyenThue: Partial<TruyenDuocThue> = {
      id: randomId(),
      giaThue: truyen.giaThue,
      ngayThue: ngayThue.toISOString(),
      ngayTra: ngayTra.toISOString(),
      soLuong: 1,
      tongTien: truyen?.giaThue,
      truyen: truyen,
    };
    setTruyenDuocThue(pre => [...pre, truyenThue]);
  };

  const taoPhieuMuon = () => {
    const phieuThue: Partial<PhieuThue> = {
      id: randomId(),
      ghiChu: ghiChu,
      tongTien: +tong.toFixed(),
      khachHang: khachHang,
      nhanVien: nhanVien,
      truyenDuocThue: truyenDuocThue,
    };
    dispatch(
      doFaker({
        phieuThues: [...(phieuThues ?? []), phieuThue],
      }),
    );
    dispatch(
      doFaker({
        truyenDuocThues: [
          ...(truyenDuocThues ?? []),
          ...truyenDuocThue.map(v => ({
            ...v,
            phieuThue: phieuThue,
          })),
        ],
      }),
    );
    Alert.alert('Tạo phiếu mượn thành công');
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
                <View style={[Layout.rowHCenter]}>
                  <Image
                    source={Images.avatar.male_5}
                    style={[Common.iconSize, Gutters.tinyRMargin]}
                    resizeMode="contain"
                  />
                  <Text style={[Fonts.textSmall]}>
                    {khachHang.tenKhachHang}
                  </Text>
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
                  <TouchableOpacity>
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
                  navigation.navigate('BookSelect', { chooseBook: chonTruyen })
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
              <TouchableOpacity>
                <Image
                  source={Images.icons.barcode_scanner}
                  style={[Common.regularSize, { tintColor: Colors.blue }]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[Gutters.tinyHPadding, Gutters.tinyVMargin]}>
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
                  { flex: 1 },
                ]}
              >
                Số lượng
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
            {truyenDuocThue?.map((truyen, index) => (
              <View
                key={index}
                style={[
                  Layout.row,
                  Layout.justifyContentBetween,
                  Gutters.tinyVMargin,
                ]}
              >
                <Text style={[Fonts.textSmall, { flex: 2 }]}>
                  {truyen?.truyen?.tenTruyen}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                  {numberWithCommas(truyen.giaThue)}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textCenter, { flex: 1 }]}>
                  {truyen?.soLuong}
                </Text>
                <Text style={[Fonts.textSmall, Fonts.textRight, { flex: 1 }]}>
                  {numberWithCommas(truyen.giaThue)}đ
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
              {numberWithCommas(tong.toFixed())}đ
            </Text>
          </View>
          <View style={[Gutters.smallTMargin]}>
            <Text style={[Fonts.textTiny, Fonts.textItalic]}>
              Ngày thuê: {dateFormat(ngayThue)}
            </Text>
            <TouchableOpacity
              style={[Layout.rowHCenter]}
              onPress={() =>
                datePicker?.toggle?.(true, 'datetime', d => {
                  setNgayTra(d);
                  setTruyenDuocThue(pre =>
                    pre.map(v => ({ ...v, ngayTra: d?.toISOString() })),
                  );
                })
              }
            >
              <Text style={[Fonts.textTiny, Fonts.textItalic]}>
                Ngày trả: {'   ' + dateFormat(ngayTra)}
              </Text>
              <Image
                source={Images.icons.pencil}
                style={[
                  Common.regularSize,
                  Gutters.tinyLMargin,
                  { tintColor: Colors.primary },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
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
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>
            In phiếu mượn
          </Text>
        </TouchableOpacity>
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
          onPress={taoPhieuMuon}
        >
          <Text style={[Fonts.textSmall, Fonts.textBold500]}>Tạo phiếu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RentBook;
