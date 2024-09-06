import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setMessageList } from '@/features/messageListSlice';
import { useWsFunc } from '@/hooks';

export function useMessageList() {
  const dispatch = useDispatch();
  const { onMounted, messageList: messageListInit } = useWsFunc();
  const messageList = useSelector(
    (state: RootState) => state.messageListReducer.messageList,
  );

  const fetchMessageList = async () => {
    await onMounted();
    dispatch(setMessageList(messageListInit));
  };

  const updateMessageList = async () => {
    dispatch(setMessageList(messageList));
  };

  return { messageList, fetchMessageList, updateMessageList };
}
