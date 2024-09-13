import { configureStore } from '@reduxjs/toolkit';

import userReducer from '@/features/userSlice';
import loadingReducer from '@/features/loadingSlice';
import friendListReducer from '@/features/friendListSlice';
import messageListReducer from '@/features/messageListSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    loadingReducer,
    friendListReducer,
    messageListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
