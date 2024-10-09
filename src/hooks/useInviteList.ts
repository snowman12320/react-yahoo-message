import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { updateInviteList } from '@/features/inviteListSlice';
import { inviteListType } from '@/types';

export function useInviteList() {
  const dispatch = useDispatch();
  const inviteList = useSelector((state: RootState) => state.inviteListReducer);

  const updateInvite = (invite: inviteListType) => {
    dispatch(updateInviteList(invite));
  };

  return { inviteList, updateInvite };
}
