import { FriendListResponse } from '@/types';

export type MessageListType = {
  id: string;
  context: string;
  content: string;
  uuid: string;
  name: string;
  photo: string;
  createdAt: string;
  toId: string;
  isRead: boolean;
};

export type MessageListProps = {
  messageList: MessageListType[] | undefined;
  uuid: string;
  friend: FriendListResponse[0];
};
