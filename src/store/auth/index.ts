import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { accessToken: null } as AuthState,
  reducers: {
    setToken: (state, { payload: { accessToken } }: AuthPayload) => {
      if (typeof accessToken !== 'undefined') {
        state.accessToken = accessToken;
      }
    },
  },
});

export const { setToken } = slice.actions;

export default slice.reducer;

export type AuthState = {
  accessToken: string | null;
};

type AuthPayload = {
  payload: Partial<AuthState>;
};
