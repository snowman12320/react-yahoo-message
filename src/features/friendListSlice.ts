import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendListResponse } from '@/types';

interface FriendListState {
  friends: FriendListResponse;
}

const initialState: FriendListState = {
  friends: [],
};

const friendListSlice = createSlice({
  name: 'friendList',
  initialState,
  reducers: {
    setFriendList(state, action: PayloadAction<FriendListResponse>) {
      return { ...state, friends: action.payload };
    },
  },
});

export const { setFriendList } = friendListSlice.actions;
export default friendListSlice.reducer;
