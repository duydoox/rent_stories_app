import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { PhieuThue } from 'types/faker';

export const getTatCaPhieuThue = (build: EndpointBuilder<any, any, any>) =>
  build.query<ResGetTatCaPhieuThueT, ReqGetTatCaPhieuThueT>({
    query: ({ ...params }) => ({
      url: 'phieuThue',
      method: 'GET',
      params: params,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResGetTatCaPhieuThueT = ResponseT<PhieuThue[]>;

export type ReqGetTatCaPhieuThueT = {};
