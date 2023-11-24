import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { TruyenDuocTra } from 'types/faker';

export const getChiTietThongKe = (build: EndpointBuilder<any, any, any>) =>
  build.query<ResGetChiTietTKT, ReqGetChiTietTKT>({
    query: ({ ...params }) => ({
      url: 'truyenDuocTra/chiTietThongKe',
      method: 'GET',
      params: params,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResGetChiTietTKT = ResponseT<TruyenDuocTra[]>;

export type ReqGetChiTietTKT = {
  maTruyen: string;
  ngayBatDau: string;
  ngayKetThuc: string;
};
