import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendListResponse } from '@/types';

interface FriendListState {
  friendList: FriendListResponse;
}

const initialState: FriendListState = {
  friendList: [],
};

const friendListSlice = createSlice({
  name: 'friendList',
  initialState,
  reducers: {
    setFriendList(state, action: PayloadAction<FriendListResponse>) {
      return { ...state, friendList: action.payload };
    },
  },
});

export const { setFriendList } = friendListSlice.actions;
export default friendListSlice.reducer;
