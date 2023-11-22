import { api } from '../../api';
import { getDanhSachTruyenThueCuaKhach } from './getDanhSachTruyenThueCuaKhach';
import { tinhTienTruyenThue } from './tinhTienTruyenThue';

export const truyenDuocThueApi = api.injectEndpoints({
  endpoints: build => ({
    tinhTienTruyenThue: tinhTienTruyenThue(build),
    getDanhSachTruyenThueCuaKhach: getDanhSachTruyenThueCuaKhach(build),
  }),
  overrideExisting: false,
});

export const {
  useTinhTienTruyenThueMutation,
  useGetDanhSachTruyenThueCuaKhachQuery,
} = truyenDuocThueApi;
