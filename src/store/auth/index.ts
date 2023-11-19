import { createSlice } from '@reduxjs/toolkit';
import { NhanVien } from 'types/faker';

const slice = createSlice({
  name: 'auth',
  initialState: { accessToken: null, nhanVien: null } as AuthState,
  reducers: {
    setToken: (state, { payload: { accessToken } }: AuthPayload) => {
      if (typeof accessToken !== 'undefined') {
        state.accessToken = accessToken;
      }
    },
    setNhanVien: (state, { payload: { nhanVien } }: AuthPayload) => {
      if (typeof nhanVien !== 'undefined') {
        state.nhanVien = nhanVien;
      }
    },
  },
});

export const { setToken, setNhanVien } = slice.actions;

export default slice.reducer;

export type AuthState = {
  accessToken: string | null;
  nhanVien: Partial<NhanVien> | null;
};

type AuthPayload = {
  payload: Partial<AuthState>;
};
