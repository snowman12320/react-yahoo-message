import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app/store';
import { setFriendList } from '@/features/friendListSlice';
import { fetchFriendList as fetchFriendListApi } from '@/api';

export function useFriendList() {
  const dispatch = useDispatch();
  const friendList = useSelector(
    (state: RootState) => state.friendListReducer,
  );

  const fetchFriendList = async () => {
    const {
      data: { friends },
    } = await fetchFriendListApi();
    dispatch(setFriendList(friends));
  };

  return { friendList, fetchFriendList };
}
