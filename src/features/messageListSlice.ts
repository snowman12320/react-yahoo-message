import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageListType } from '@/types';

const messageListSlice = createSlice({
  name: 'messageList',
  initialState: [] as MessageListType[],
  reducers: {
    setMessageList: (_state, action: PayloadAction<MessageListType[]>) => action.payload,
    updateMessageList: (
      state,
      action: PayloadAction<
      // eslint-disable-next-line
        (prevState: MessageListType[]) => MessageListType[]
      >,
    ) => action.payload(state),
  },
});

export const { setMessageList, updateMessageList } = messageListSlice.actions;
export default messageListSlice.reducer;
