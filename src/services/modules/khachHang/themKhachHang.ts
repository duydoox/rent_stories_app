import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { KhachHang } from 'types/faker';

export const themKhachHang = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<ResThemKhachHangT, ReqThemKhachHangT>({
    query: ({ ...body }) => ({
      url: 'khachHang/themKhachHang',
      method: 'POST',
      body: body,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResThemKhachHangT = ResponseT<KhachHang>;

export type ReqThemKhachHangT = {
  tenKhachHang: string;
  soDienThoai: string;
};
