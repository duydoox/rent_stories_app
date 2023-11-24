import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

export const getThongKe = (build: EndpointBuilder<any, any, any>) =>
  build.query<ResGetThongKeT, ReqGetThongKeT>({
    query: ({ ...params }) => ({
      url: 'truyenDuocTra/thongKe',
      method: 'GET',
      params: params,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResGetThongKeT = ResponseT<ThongKe[]>;

export type ReqGetThongKeT = {
  ngayBatDau: string;
  ngayKetThuc: string;
};

export type ThongKe = {
  maTruyen: string;
  tenTruyen: string;
  soLuong: number;
  tienDaTra: number;
};
