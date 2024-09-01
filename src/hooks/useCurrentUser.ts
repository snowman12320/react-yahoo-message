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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-300';
      default:
        return 'bg-black';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return '(上線中）';
      case 'busy':
        return '(忙碌中）';
      case 'offline':
        return '(離線中）';
      default:
        return '';
    }
  };

  return {
    setCurrentUser,
    getCurrentUser,
    getStatusColor,
    getStatusText,
  };
}
