import { configureStore } from '@reduxjs/toolkit';

import userReducer from '@/features/userSlice';
import loadingReducer from '@/features/loadingSlice';
import friendListReducer from '@/features/friendListSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    friendList: friendListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
