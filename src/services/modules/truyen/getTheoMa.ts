import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { Truyen } from 'types/faker';

export const getTheoMa = (build: EndpointBuilder<any, any, any>) =>
  build.query<ResGetTruyenTheoMaT, ReqGetTruyenTheoMaT>({
    query: ({ maTruyen, ...params }) => ({
      url: 'truyen/' + maTruyen,
      method: 'GET',
      params: params,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResGetTruyenTheoMaT = ResponseT<Truyen>;

export type ReqGetTruyenTheoMaT = {
  maTruyen: string;
};
