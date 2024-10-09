import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendListResponse } from '@/types';

const friendListSlice = createSlice({
  name: 'friendList',
  initialState: [] as FriendListResponse,
  reducers: {
    setFriendList(_state, action: PayloadAction<FriendListResponse>) {
      return action.payload;
    },
  },
});

export const { setFriendList } = friendListSlice.actions;
export default friendListSlice.reducer;
