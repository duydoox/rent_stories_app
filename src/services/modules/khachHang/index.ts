import { api } from '../../api';
import { getKhachHang } from './getKhachHang';
import { getTatCaKhachHang } from './getTatCaKhachHang';
import { themKhachHang } from './themKhachHang';

export const khachHangApi = api.injectEndpoints({
  endpoints: build => ({
    getKhachHang: getKhachHang(build),
    getTatCaKhachHang: getTatCaKhachHang(build),
    themKhachHang: themKhachHang(build),
  }),
  overrideExisting: false,
});

export const {
  useGetKhachHangQuery,
  useLazyGetKhachHangQuery,
  useGetTatCaKhachHangQuery,
  useThemKhachHangMutation,
} = khachHangApi;
