import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './userSlice';
import chatSlice from './chatSlice';

const store = configureStore({
  reducer: {
    usersSlice,
    chatSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
