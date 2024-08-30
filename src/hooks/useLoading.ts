import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/app/store';
import { setLoading as setLoadingAction } from '@/features/loadingSlice';

export function useLoading() {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.loading?.isLoading ?? false,
  );

  const getIsLoading = () => isLoading;

  const setLoading = (loading: boolean) => {
    dispatch(setLoadingAction(loading));
  };

  return { getIsLoading, setLoading };
}
