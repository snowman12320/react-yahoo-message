import { useState } from 'react';

import { MessageListType } from '@/types';

interface inviteListType {
  context: string;
  from: string;
  name: string;
  photo: string;
  createdAt: string;
}

export function useWsFunc() {
  // const token: string | null = '';
  let host = '';
  let ws: WebSocket;

  const open = true;
  let uuid = '';
  let name = '';

  const message = '123';
  const [messageList, setMessageList] = useState<MessageListType[]>([]);
  // 使用 useState 來管理 messageList
  const messageRef = null;
  const toID: string | null = ''; // 要傳送訊息的對象，也等於單獨的聊天室

  const inviteList: inviteListType[] = [];

  // 開始監聽後端WS
  const onMounted = async (fromToken: string) => {
    // token = await prompt('請輸入用戶 token');
    host = `ws://localhost:3001/ws?token=${fromToken}`;
    // host = `wss://one04social-back-end.onrender.com/ws?token=${token}`;

    ws = new WebSocket(host);
    ws.onopen = _res => {
      console.info('前端 WS 連線成功：', _res);
    };

    ws.onmessage = res => {
      const data = JSON.parse(res.data);
      // console.warn('各種訊息攔截：',data);

      if (data.context === 'user') {
        uuid = data.uuid;
        name = data.name;
      }

      if (data.context === 'message') {
        setMessageList(prev => [...prev, data]); // 更新 messageList
      }

      if (data.context === 'invite') {
        const index = inviteList.findIndex(
          notification => notification.from === data.from,
        );

        if (index !== -1) inviteList.splice(index, 1);
        else inviteList.push(data);
      }
    };
  };

  // 觸發後端WS
  const sendMessage = () => {
    ws.send(
      JSON.stringify({
        context: 'message',
        content: message,
        from: uuid,
        to: toID,
      }),
    );

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
    ws.send(
      JSON.stringify({
        context: 'invite',
        to,
      }),
    );
  };

  return {
    open,
    uuid,
    name,
    message,
    messageList,
    messageRef,
    inviteList,

    onMounted,
    sendMessage,
    invite,
  };
}
