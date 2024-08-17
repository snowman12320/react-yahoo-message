import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export function useCurrentUser() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (currentUser) {
    return currentUser;
  }

  const localStorageUser = localStorage.getItem('yahooCurrentUser');
  return localStorageUser ? JSON.parse(localStorageUser) : null;
}
