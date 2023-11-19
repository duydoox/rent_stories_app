import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { NhanVien } from 'types/faker';

export const getInfo = (build: EndpointBuilder<any, any, any>) =>
  build.query<ResGetInfoT, ReqGetInfoT>({
    query: ({ ...params }) => ({
      url: 'nhanVien/layThongTin',
      method: 'GET',
      params: params,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResGetInfoT = ResponseT<NhanVien>;

export type ReqGetInfoT = {};
