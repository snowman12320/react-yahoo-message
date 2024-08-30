import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app/store';
import { setCurrentUser as setCurrentUserAction } from '@/features/userSlice';
import { Profile } from '@/types';

export function useCurrentUser() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const getCurrentUser = () => {
    if (currentUser) {
      return currentUser;
    }

    const localStorageUser = localStorage.getItem('yahooCurrentUser');
    return localStorageUser ? JSON.parse(localStorageUser) : null;
  };

  const setCurrentUser = (user: Profile) => {
    dispatch(setCurrentUserAction(user));
  };

  return { setCurrentUser, getCurrentUser };
}
