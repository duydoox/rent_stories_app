import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
  Book: undefined;
  RentBook: undefined;
  ReturnBook: undefined;
  Statistic: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  AddBook: { type: 'ADD' | 'EDIT' };
  Bill: undefined;
  Login: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;

export type AddBookScreenProps = StackScreenProps<
  ApplicationStackParamList,
  'AddBook'
>;
