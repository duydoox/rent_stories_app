import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { KhachHang } from 'types/faker';

export const getKhachHang = (build: EndpointBuilder<any, any, any>) =>
  build.query<ResGetKhachHangT, ReqGetKhachHangT>({
    query: ({ maKhachHang, ...params }) => ({
      url: 'khachHang/' + maKhachHang,
      method: 'GET',
      params: params,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResGetKhachHangT = ResponseT<KhachHang>;

export type ReqGetKhachHangT = {
  maKhachHang: string;
};
