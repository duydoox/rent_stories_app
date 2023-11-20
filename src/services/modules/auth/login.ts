import { ResponseT } from '@/services/api';
import { setNhanVien, setToken } from '@/store/auth';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { NhanVien } from 'types/faker';

export const login = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<ResLoginT, ReqLoginT>({
    query: ({ ...body }) => ({
      url: 'auth/login',
      method: 'POST',
      body: body,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        dispatch(
          setToken({
            accessToken: data.data.accessToken,
          }),
        );
        dispatch(
          setNhanVien({
            nhanVien: data.data.nhanVien,
          }),
        );
      } catch {}
    },
  });

export type ResLoginT = ResponseT<{
  accessToken: string;
  nhanVien: NhanVien;
}>;

export type ReqLoginT = {
  username: string;
  password: string;
};
