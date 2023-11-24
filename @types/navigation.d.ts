import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { HoaDon, KhachHang, Truyen, TruyenDuocThue } from './faker';
import { ReqGetChiTietTKT } from '@/services/modules/truyenDuocTra/getChiTietThongKe';

export type MainParamsList = {
  Home: undefined;
  Book: undefined;
  RentBook: undefined;
  ReturnBook: undefined;
  Statistic: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  AddBook: { type: 'ADD' | 'EDIT'; truyen?: Partial<Truyen> };
  BookSelect: {
    chooseBook: (truyen: Partial<TruyenDuocThue>) => void;
    ngayThue: string;
  };
  AddCustomer: {
    chooseCustomer: (truyen: KhachHang) => void;
  };
  ReturnBookDetail: {
    khachHang: KhachHang;
  };
  Bill: {
    hoaDon: HoaDon;
    ngayTra: string;
    khachHang: khachHang;
  };
  Login: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
  StatisticDetail: ReqGetChiTietTKT & { tenTruyen: string };
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;

export type AddBookScreenProps = StackScreenProps<
  ApplicationStackParamList,
  'AddBook'
>;

export type BookSelectScreenProps = StackScreenProps<
  ApplicationStackParamList,
  'BookSelect'
>;

export type AddCustomerScreenProps = StackScreenProps<
  ApplicationStackParamList,
  'AddCustomer'
>;

export type ReturnBookDetailScreenProps = StackScreenProps<
  ApplicationStackParamList,
  'ReturnBookDetail'
>;

export type BillScreenProps = StackScreenProps<
  ApplicationStackParamList,
  'Bill'
>;

export type StatisticDetailScreenProps = StackScreenProps<
  ApplicationStackParamList,
  'StatisticDetail'
>;
