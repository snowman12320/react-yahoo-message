import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '@/types';

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
      // eslint-disable-next-line no-param-reassign
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    clearCurrentUser: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
