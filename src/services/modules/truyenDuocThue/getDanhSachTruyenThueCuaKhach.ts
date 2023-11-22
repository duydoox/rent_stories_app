import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { TruyenDuocThue } from 'types/faker';

export const getDanhSachTruyenThueCuaKhach = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.query<ResDanhSachThueT, ReqDanhSachThueT>({
    query: ({ ...params }) => ({
      url: 'truyenDuocThue/danhSachThue',
      method: 'GET',
      params: params,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResDanhSachThueT = ResponseT<TruyenDuocThue[]>;

export type ReqDanhSachThueT = {
  maKhachHang: string;
  isUnpaid?: boolean;
};
