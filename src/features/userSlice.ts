/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '@/types';
import { storeInStorage, removeFromStorage } from '@/api';

interface UserState {
  currentUser: Profile | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<Profile>) => {
      state.currentUser = action.payload;
      storeInStorage('yahooCurrentUser', action.payload);
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      removeFromStorage('yahooCurrentUser');
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
