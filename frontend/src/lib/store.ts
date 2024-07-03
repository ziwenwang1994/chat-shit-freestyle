import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';

export const GlobalStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
    },
  });
};

export type AppStore = ReturnType<typeof GlobalStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];