import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { Truyen } from 'types/faker';

export const timKiemTruyen = (build: EndpointBuilder<any, any, any>) =>
  build.query<ResTimKiemTruyenTruyenT, ReqTimKiemTruyenTruyenT>({
    query: ({ ...params }) => ({
      url: 'truyen/timKiem',
      method: 'GET',
      params: params,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    providesTags: ['Truyen'],
  });

export type ResTimKiemTruyenTruyenT = ResponseT<Truyen[]>;

export type ReqTimKiemTruyenTruyenT = {
  keyword: string;
};
