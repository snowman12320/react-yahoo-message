import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setMessageList } from '@/features/messageListSlice';
import { useWsFunc } from '@/hooks';
import { MessageListType } from '@/types';

export function useMessageList() {
  const dispatch = useDispatch();
  const { onMounted } = useWsFunc();
  const messageList = useSelector(
    (state: RootState) => state.messageListReducer.messageList,
  );

  const fetchMessageList = async () => {
    await onMounted();
  };

  const updateMessageList = async (messageListProp: MessageListType[]) => {
    dispatch(setMessageList(messageListProp));
  };

  return { messageList, fetchMessageList, updateMessageList };
}
