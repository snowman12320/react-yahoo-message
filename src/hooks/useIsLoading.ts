import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export default function useIsLoading() {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  return isLoading;
}
