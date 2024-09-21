import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export function useIsLoading() {
  const isLoading = useSelector((state: RootState) => state.loadingReducer.isLoading ?? false);
  return isLoading;
}
