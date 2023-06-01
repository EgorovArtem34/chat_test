import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MessageType = {
  from: string;
  text: string;
};

type ChatState = {
  chatIds: string[],
  activeChatId: string | null,
  messages: {
    [key: string]: MessageType[],
  };
};

const initialState: ChatState = {
  chatIds: [],
  activeChatId: null,
  messages: {},
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
    setMessage(state, { payload }) {
      if (state.activeChatId) {
        state.messages[state.activeChatId] = [...state.messages[state.activeChatId] || [], payload];
      }
    },
  },
});

export const { setChatId, setActiveChat, setMessage } = chatSlice.actions;
export default chatSlice.reducer;
