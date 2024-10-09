import { configureStore } from '@reduxjs/toolkit';

import userReducer from '@/features/userSlice';
import loadingReducer from '@/features/loadingSlice';
import friendListReducer from '@/features/friendListSlice';
import messageListReducer from '@/features/messageListSlice';
import inviteListReducer from '@/features/inviteListSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    loadingReducer,
    friendListReducer,
    messageListReducer,
    inviteListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
