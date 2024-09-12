import { useState } from 'react';

import {
  Drawer,
  // DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button, MessageList, Bell } from '@/components';
import { useWsFunc, useCurrentUser, useMessageList } from '@/hooks';
import { FriendListResponse } from '@/types';

export function ChatRoom({ friend }:{ friend: FriendListResponse[0] }) {
  const { sendMessage } = useWsFunc();
  const { getCurrentUser, getStatusColor } = useCurrentUser();
  const currentUser = getCurrentUser();
  const [isOpen, setOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const { messageList } = useMessageList();

  const handleSendMessage = (message: string) => {
    sendMessage({
      message,
      from: currentUser?._id,
      toID: friend._id,
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger className="absolute inset-0 z-0" />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="space-x-3 text-center">
            {' '}
            <span
              className={`inline-block size-2 rounded-full 
                      ${getStatusColor(friend?.onlineStatus)}`}
            />
            <span>{friend.name}</span>
          </DrawerTitle>
          <DrawerDescription>
            {friend?.messageBoard?.startsWith('https') ? (
              <a
                href={friend?.messageBoard}
                className="flex-1 break-all text-sm underline"
                target="_blank"
                rel="noreferrer"
              >
                {friend?.messageBoard}
              </a>
            ) : (
              <p
                className={`flex-1 text-sm ${!friend?.messageBoard?.trim() ? 'italic text-gray-400' : ''}`}
              >
                {friend?.messageBoard?.trim()
                  ? friend.messageBoard
                  : ''}
              </p>
            )}
          </DrawerDescription>

        </DrawerHeader>

        <MessageList messageList={messageList} uuid={currentUser?._id} friend={friend} />

        <DrawerFooter>
          <div className="">
            <Bell
              className="size-4"
              onClick={() => handleSendMessage('有人在家嗎？')}
            />
          </div>

          <div className="flex h-[100px] gap-3">
            <textarea
              className="size-full ring-1"
              onChange={
              e => {
                setInputMessage(e.target.value);
              }
            }
              onKeyDown={e => e.key === 'Enter' && handleSendMessage(inputMessage)}
            />
            <Button
              type="button"
              onClick={() => handleSendMessage(inputMessage)}
              className="h-full flex-1"
            >
              Submit
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
