import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import chatSlice from './chatSlice';

const store = configureStore({
  reducer: {
    userSlice,
    chatSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
