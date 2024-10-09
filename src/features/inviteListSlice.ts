import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { inviteListType } from '@/types';

const inviteListSlice = createSlice({
  name: 'inviteList',
  initialState: [] as inviteListType[],
  reducers: {
    setInviteList: (_state, action: PayloadAction<inviteListType[]>) => action.payload,
    updateInviteList: (state, action: PayloadAction<inviteListType>) => {
      const index = state.findIndex(invite => invite.from === action.payload.from);
      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { setInviteList, updateInviteList } = inviteListSlice.actions;
export default inviteListSlice.reducer;
