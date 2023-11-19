import { api } from '../../api';
import { getInfo } from './getInfo';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getInfo: getInfo(build),
  }),
  overrideExisting: false,
});

export const { useGetInfoQuery } = userApi;
