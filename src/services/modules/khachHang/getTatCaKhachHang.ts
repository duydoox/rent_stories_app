import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { KhachHang } from 'types/faker';

export const getTatCaKhachHang = (build: EndpointBuilder<any, any, any>) =>
  build.query<ResGetTatCaKhachHangT, ReqGetTatCaKhachHangT>({
    query: ({ ...params }) => ({
      url: 'khachHang/',
      method: 'GET',
      params: params,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResGetTatCaKhachHangT = ResponseT<KhachHang[]>;

export type ReqGetTatCaKhachHangT = {
  keyword?: string;
};
