import { createSlice } from '@reduxjs/toolkit';
import {
  CuaHang,
  HoaDon,
  KhachHang,
  NhanVien,
  PhieuThue,
  Truyen,
  TruyenDuocThue,
} from 'types/faker';

const slice = createSlice({
  name: 'faker',
  initialState: {} as FakerState,
  reducers: {
    doFaker: (
      state,
      {
        payload: {
          cuaHangs,
          truyens,
          truyenDuocThues,
          nhanViens,
          khachHangs,
          phieuThues,
          hoaDons,
        },
      }: FakerPayload,
    ) => {
      if (typeof cuaHangs !== 'undefined') {
        state.cuaHangs = cuaHangs;
      }
      if (typeof truyens !== 'undefined') {
        state.truyens = truyens;
      }
      if (typeof truyenDuocThues !== 'undefined') {
        state.truyenDuocThues = truyenDuocThues;
      }
      if (typeof nhanViens !== 'undefined') {
        state.nhanViens = nhanViens;
      }
      if (typeof khachHangs !== 'undefined') {
        state.khachHangs = khachHangs;
      }
      if (typeof phieuThues !== 'undefined') {
        state.phieuThues = phieuThues;
      }
      if (typeof hoaDons !== 'undefined') {
        state.hoaDons = hoaDons;
      }
    },
  },
});

export const { doFaker } = slice.actions;

export default slice.reducer;

export type FakerState = {
  cuaHangs: Partial<CuaHang>[];
  truyens: Partial<Truyen>[];
  nhanViens: Partial<NhanVien>[];
  khachHangs: Partial<KhachHang>[];
  truyenDuocThues: Partial<TruyenDuocThue>[];
  phieuThues: Partial<PhieuThue>[];
  hoaDons: Partial<HoaDon>[];
};

type FakerPayload = {
  payload: Partial<FakerState>;
};
