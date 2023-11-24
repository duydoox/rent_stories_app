import { api } from '../../api';
import { getChiTietThongKe } from './getChiTietThongKe';
import { getThongKe } from './getThongKe';

export const truyenDuocTraApi = api.injectEndpoints({
  endpoints: build => ({
    getThongKe: getThongKe(build),
    getChiTietThongKe: getChiTietThongKe(build),
  }),
  overrideExisting: false,
});

export const {
  useGetThongKeQuery,
  useLazyGetThongKeQuery,
  useGetChiTietThongKeQuery,
} = truyenDuocTraApi;
