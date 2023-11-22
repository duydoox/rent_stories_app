import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { ReqTaoHoaDonT } from './taoHoaDon';

export const luuHoaDon = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<ResLuuHoaDonT, ReqLuuHoaDonT>({
    query: ({ ...body }) => ({
      url: 'hoaDon/luuHoaDon',
      method: 'POST',
      body: body,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResLuuHoaDonT = ResponseT<null>;

export type ReqLuuHoaDonT = ReqTaoHoaDonT;
