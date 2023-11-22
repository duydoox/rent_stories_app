import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { TruyenDuocThue } from 'types/faker';

export const tinhTienTruyenThue = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<ResTinhTienT, ReqTinhTienT>({
    query: ({ ...body }) => ({
      url: 'truyenDuocThue/tinhTien',
      method: 'POST',
      body: body,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResTinhTienT = ResponseT<TruyenDuocThue>;

export type ReqTinhTienT = {
  maTruyen: string;
  ngayPhaiTra: string;
  ngayThue: string;
};
