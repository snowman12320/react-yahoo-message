import { useDispatch } from 'react-redux';

import { MessageListType } from '@/types';
import { KEY_TOKEN, getFromStorage } from '@/api/storage-management';
import { setMessageList } from '@/features/messageListSlice';

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

  const initializeWebSocket = () => {
    host = `ws://localhost:3001/ws?token=${fromToken}`;
    // host = `wss://one04social-back-end.onrender.com/ws?token=${token}`;

    ws = new WebSocket(host);
    ws.onopen = () => {
      console.info('前端 WS connection opened');
    };
    ws.onerror = error => {
      console.error('前端 WS error:', error);
    };
    ws.onclose = () => {
      console.info('前端 WS connection closed');
      ws = null;
    };
  };

  let uuid = '';
  let name = '';

  const messageRef = null;
  let messageListInit: MessageListType[] = [];

  const inviteList: inviteListType[] = [];

  // 開始監聽後端WS
  const onMounted = async () => {
    await initializeWebSocket();

    if (!ws) {
      console.error('WebSocket is not initialized.');
      return;
    }

    ws.onmessage = res => {
      const msgData = JSON.parse(res.data);

      if (msgData.context === 'user') {
        uuid = msgData.uuid;
        name = msgData.name;
      }

      if (msgData.context === 'message') {
        messageListInit = [...messageListInit];
        messageListInit.push(msgData);
        dispatch(setMessageList(messageListInit));
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
    await initializeWebSocket();
    if (!ws) {
      console.error('WebSocket is not initialized.');
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

    // message = '';
    // scrollToBottom();
  };

  // 待修
  // 傳訊自動至底
  // 六角講師的 https://github.com/ayugioh2003/demo-websocket-client/blob/main/src/views/ChatView.vue
  // const scrollToBottom = async () => {
  // console.warn(messageRef.scrollHeight);
  // console.warn(messageRef.scrollTop);
  // messageRef.scrollTop = messageRef.scrollHeight;
  // console.warn(messageRef.scrollTop);
  // };

  const invite = () => {
    // eslint-disable-next-line
    const to = prompt('請輸入要邀請的用戶 ID');
    if (!ws) {
      console.error('WebSocket is not initialized.');
      return;
    }

    ws.send(
      JSON.stringify({
        context: 'invite',
        to,
      }),
    );
  };

  return {
    uuid,
    name,
    messageListInit,
    messageRef,
    inviteList,

    onMounted,
    sendMessage,
    invite,
  };
}
