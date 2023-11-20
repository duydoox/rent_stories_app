import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { Truyen } from 'types/faker';

export const suaTruyen = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<ResSuaTruyenT, ReqSuaTruyenT>({
    query: ({ maTruyen, ...body }) => ({
      url: 'truyen/' + maTruyen,
      method: 'PUT',
      body: body,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    invalidatesTags: ['Truyen'],
  });

export type ResSuaTruyenT = ResponseT<Truyen[]>;

export type ReqSuaTruyenT = {
  maTruyen: string;
  tenTruyen?: string;
  namSanXuat?: number;
  tacGia?: string;
  giaThue?: number;
  soLuong?: number;
  ghiChu?: string;
};
