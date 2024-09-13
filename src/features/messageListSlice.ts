import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageListType } from '@/types';

interface MessageListState {
  messageList: MessageListType[];
}

const initialState: MessageListState = {
  messageList: [],
};

const messageListSlice = createSlice({
  name: 'messageList',
  initialState,
  reducers: {
    setMessageList(state, action: PayloadAction<MessageListType[]>) {
      return {
        ...state,
        messageList: action.payload,
      };
    },
  },
});

export const { setMessageList } = messageListSlice.actions;
export default messageListSlice.reducer;
