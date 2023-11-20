import { api } from '../../api';
import { getTatCatTruyen } from './getTatCaTruyen';
import { getTheoMa } from './getTheoMa';
import { suaTruyen } from './suaTruyen';
import { themTruyen } from './themTruyen';
import { timKiemTruyen } from './timKiemTruyenTheoTen';
import { xoaTruyen } from './xoaTruyen';

export const truyenApi = api.injectEndpoints({
  endpoints: build => ({
    getTruyenTheoMa: getTheoMa(build),
    getTatCatTruyen: getTatCatTruyen(build),
    themTruyen: themTruyen(build),
    suaTruyen: suaTruyen(build),
    xoaTruyen: xoaTruyen(build),
    timKiemTruyen: timKiemTruyen(build),
  }),
  overrideExisting: false,
});

export const {
  useGetTruyenTheoMaQuery,
  useGetTatCatTruyenQuery,
  useThemTruyenMutation,
  useSuaTruyenMutation,
  useXoaTruyenMutation,
  useTimKiemTruyenQuery,
} = truyenApi;
