import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { Truyen } from 'types/faker';

export const xoaTruyen = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<ResXoaTruyenT, ReqXoaTruyenT>({
    query: ({ maTruyen }) => ({
      url: 'truyen/' + maTruyen,
      method: 'DELETE',
      body: {},
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    invalidatesTags: ['Truyen'],
  });

export type ResXoaTruyenT = ResponseT<Truyen[]>;

export type ReqXoaTruyenT = {
  maTruyen: string;
};
