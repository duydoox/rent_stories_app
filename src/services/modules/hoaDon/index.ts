import { api } from '../../api';
import { taoHoaDon } from './taoHoaDon';
import { luuHoaDon } from './luuHoaDon';

export const hoaDonApi = api.injectEndpoints({
  endpoints: build => ({
    taoHoaDon: taoHoaDon(build),
    luuHoaDon: luuHoaDon(build),
  }),
  overrideExisting: false,
});

export const { useTaoHoaDonMutation, useLuuHoaDonMutation } = hoaDonApi;
