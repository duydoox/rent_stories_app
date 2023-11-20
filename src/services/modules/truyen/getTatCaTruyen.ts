import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { Truyen } from 'types/faker';

export const getTatCatTruyen = (build: EndpointBuilder<any, any, any>) =>
  build.query<ResGetTatCaTruyenT, ReqGetTatCaTruyenT>({
    query: ({ ...params }) => ({
      url: 'truyen',
      method: 'GET',
      params: params,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    providesTags: ['Truyen'],
  });

export type ResGetTatCaTruyenT = ResponseT<Truyen[]>;

export type ReqGetTatCaTruyenT = {};
