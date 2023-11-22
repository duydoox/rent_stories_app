import { api } from '../../api';
import { getTatCaPhieuThue } from './getTatCaPhieuThue';
import { themPhieuThue } from './themPhieuThue';

export const phieuThueApi = api.injectEndpoints({
  endpoints: build => ({
    getTatCaPhieuThue: getTatCaPhieuThue(build),
    themPhieuThue: themPhieuThue(build),
  }),
  overrideExisting: false,
});

export const { useGetTatCaPhieuThueQuery, useThemPhieuThueMutation } =
  phieuThueApi;
