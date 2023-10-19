import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'setting',
  initialState: { language: 'en' } as SettingState,
  reducers: {
    changelanguage: (state, { payload: { language } }: SettingPayload) => {
      if (typeof language !== 'undefined') {
        state.language = language;
      }
    },
  },
});

export const { changelanguage } = slice.actions;

export default slice.reducer;

export type SettingState = {
  language: string;
};

type SettingPayload = {
  payload: Partial<SettingState>;
};
