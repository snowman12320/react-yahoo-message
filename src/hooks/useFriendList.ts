import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app/store';
import { setFriendList } from '@/features/friendListSlice';
import { fetchFriendList } from '@/api';

export function useFriendList() {
  const dispatch = useDispatch();
  const friendList = useSelector((state: RootState) => state.friendList.friends);

  const updateFriendList = async () => {
    const {
      data: { friends },
    } = await fetchFriendList();
    dispatch(setFriendList(friends));
  };

  return { friendList, updateFriendList };
}
