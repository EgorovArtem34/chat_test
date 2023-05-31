import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ChatState = {
  chatIds: string[],
  activeChatId: string | null,
};

const initialState: ChatState = {
  chatIds: [],
  activeChatId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatId(state, { payload }: PayloadAction<string>) {
      state.chatIds = [payload, ...state.chatIds];
    },
    setActiveChat(state, { payload }: PayloadAction<string>) {
      state.activeChatId = payload;
    },
  },
});

export const { setChatId, setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;
