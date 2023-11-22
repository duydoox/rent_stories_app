import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { HoaDon } from 'types/faker';

export const taoHoaDon = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<ResTaoHoaDonT, ReqTaoHoaDonT>({
    query: ({ ...body }) => ({
      url: 'hoaDon/taoHoaDon',
      method: 'POST',
      body: body,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResTaoHoaDonT = ResponseT<HoaDon>;

export type ReqTaoHoaDonT = {
  dsTruyenCanTra: {
    ngayTra: string;
    maTruyenDuocThue: string;
  }[];
  ghiChu?: string;
};
