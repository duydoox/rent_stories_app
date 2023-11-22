import { ResponseT } from '@/services/api';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

export const themPhieuThue = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<ResThemPhieuThueT, ReqThemPhieuThueT>({
    query: ({ ...body }) => ({
      url: 'phieuThue/themPhieuThue',
      method: 'POST',
      body: body,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
  });

export type ResThemPhieuThueT = ResponseT<null>;

export type ReqThemPhieuThueT = {
  ghiChu?: string;
  maKhachHang: string;
  dsTruyenDuocThue: {
    ngayPhaiTra: string;
    maTruyen: string;
    ngayThue: string;
  }[];
};
