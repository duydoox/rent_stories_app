import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { KhachHang, PhieuThue, Truyen } from './faker';

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
    chooseBook: (truyen: Partial<Truyen>) => void;
  };
  AddCustomer: {
    chooseCustomer: (truyen: Partial<KhachHang>) => void;
  };
  ReturnBookDetail: {
    phieuThue: Partial<PhieuThue>;
  };
  Bill: {
    phieuThue: Partial<PhieuThue>;
  };
  Login: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
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
