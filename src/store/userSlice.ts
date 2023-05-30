import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  isAuth: boolean;
  userData: {
    id: string | null;
    token: string | null;
  };
};

type AuthPayload = {
  id: null | string;
  token: null | string;
};

const initialState: UserState = {
  isAuth: false,
  userData: {
    id: null,
    token: null,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuth(state, { payload }: PayloadAction<AuthPayload>) {
      const { id, token } = payload;
      state.userData.id = id;
      state.userData.token = token;
      state.isAuth = true;
    },
    removeAuth(state) {
      state.userData.id = null;
      state.userData.token = null;
      state.isAuth = false;
    },
  },
});

export const { setAuth, removeAuth } = usersSlice.actions;
export default usersSlice.reducer;
