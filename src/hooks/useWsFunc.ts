import { useDispatch } from 'react-redux';

import { MessageListType } from '@/types';
import { KEY_TOKEN, getFromStorage } from '@/api/storage-management';
import { setMessageList, updateMessageList } from '@/features/messageListSlice';

interface inviteListType {
  context: string;
  from: string;
  name: string;
  photo: string;
  createdAt: string;
}

export function useWsFunc() {
  const dispatch = useDispatch();
  const fromToken = getFromStorage(KEY_TOKEN, 'SESSION');

  let host = '';
  let ws: WebSocket | null = null;
  let isWsInitialized = false;

  const initializeWebSocket = () => {
    if (isWsInitialized) return;

    // if (window.location.protocol === 'http:') {
    host = `ws://localhost:3001/ws?token=${fromToken}`;
    // } else if (window.location.protocol === 'https:') {
    //   host = `wss://one04social-back-end.onrender.com/ws?token=${fromToken}`;
    // }

    ws = new WebSocket(host);
    ws.onopen = () => {
      console.info('前端 WS connection opened');
      isWsInitialized = true;
    };
    ws.onerror = error => {
      console.error('😅 前端 WS error:', error);
    };
    ws.onclose = () => {
      console.info('前端 WS connection closed');
      ws = null;
      isWsInitialized = false;
    };
  };

  let uuid = '';
  let name = '';

  const messageRef = null;
  let messageListHistory: MessageListType[] = [];

  const inviteList: inviteListType[] = [];

  // 開始監聽後端WS
  const onMounted = async () => {
    await initializeWebSocket();

    if (!ws) {
      console.error('😅 WebSocket is not initialized.');
      return;
    }

    ws.onmessage = res => {
      const msgData = JSON.parse(res.data);

      if (msgData.context === 'user') {
        uuid = msgData.uuid;
        name = msgData.name;
      }

      if (msgData.context === 'oldMessage') {
        messageListHistory = [...messageListHistory, msgData];
        dispatch(setMessageList(messageListHistory));
      }

      if (msgData.context === 'read') {
        // 將所有消息標記為已讀
        dispatch(updateMessageList(prev => prev.map(msg => ({ ...msg, isRead: true }))));
      }

      if (msgData.context === 'message') {
        // 添加新消息，只有新消息是未讀狀態
        dispatch(updateMessageList(prev => [
          ...prev,
          { ...msgData, isRead: false },
        ]));
      }

      if (msgData.context === 'invite') {
        const index = inviteList.findIndex(
          notification => notification.from === msgData.from,
        );

        if (index !== -1) inviteList.splice(index, 1);
        else inviteList.push(msgData);
      }
    };
  };

  interface sendMessageType {
    message: string;
    from: string;
    toID: string;
  }

  // 觸發後端WS
  const sendMessage = async ({ message, from, toID }: sendMessageType) => {
    if (!isWsInitialized) {
      initializeWebSocket();
    }

    if (!ws) {
      console.error('😅 WebSocket is not initialized.');
      return;
    }

    ws.onopen = () => {
      ws?.send(
        JSON.stringify({
          context: 'message',
          content: message,
          from,
          to: toID,
        }),
      );
    };

    // setInputMessage('');
    // message = '';
    // scrollToBottom();
  };

  const invite = () => {
    // eslint-disable-next-line
    const to = prompt('請輸入要邀請的用戶 ID');
    if (!ws) {
      console.error('😅 WebSocket is not initialized.');
      return;
    }

    ws.send(
      JSON.stringify({
        context: 'invite',
        to,
      }),
    );
  };

  const readMessage = ({
    from,
    toID,
    newMessageListHistory,
  }: {
    from: string;
    toID: string;
    newMessageListHistory: Array<MessageListType>;
  }) => {
    if (!isWsInitialized) {
      initializeWebSocket();
    }

    if (!ws) {
      console.error('😅 WebSocket is not initialized.');
      return;
    }

    ws.onopen = () => {
      ws?.send(
        JSON.stringify({
          context: 'read',
          from,
          to: toID,
          newMessageListHistory,
        }),
      );
    };
  };

  return {
    uuid,
    name,
    messageListHistory,
    messageRef,
    inviteList,

    onMounted,
    sendMessage,
    invite,
    readMessage,
  };
}
