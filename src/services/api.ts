import { RootState } from '@/store';
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Alert } from 'react-native';

const prepareHeaders = (headers: any, { getState }: any) => {
  const state = getState() as RootState;
  const token = state.auth.accessToken;
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }

  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,
  prepareHeaders: prepareHeaders,
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  if (result.error) {
    Alert.alert('Lỗi', JSON.stringify(result?.error?.data?.message));
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  tagTypes: ['Truyen', 'KhachHang', 'NhanVien'],
});

export type ResponseT<T> = {
  data: T;
  message: string;
  status: number;
  success: boolean;
};
