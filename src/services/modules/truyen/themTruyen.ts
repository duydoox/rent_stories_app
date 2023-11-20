import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { Truyen } from 'types/faker';

export const themTruyen = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<ResThemTruyenT, ReqThemTruyenT>({
    query: ({ ...body }) => ({
      url: 'truyen/',
      method: 'POST',
      body: body,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    invalidatesTags: ['Truyen'],
  });

export type ResThemTruyenT = ResponseT<Truyen[]>;

export type ReqThemTruyenT = {
  tenTruyen: string;
  namSanXuat?: number;
  tacGia?: string;
  giaThue: number;
  soLuong: number;
  ghiChu?: string;
};
