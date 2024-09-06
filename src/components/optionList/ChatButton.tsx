import { useState } from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button, MessageList } from '@/components';
import { useWsFunc, useCurrentUser, useMessageList } from '@/hooks';
import { FriendListResponse } from '@/types';

export function ChatButton({ friend }:{ friend: FriendListResponse[0] }) {
  const { sendMessage } = useWsFunc();
  const { getCurrentUser } = useCurrentUser();
  const currentUser = getCurrentUser();
  const [isOpen, setOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const { messageList } = useMessageList();

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger className="absolute inset-0 z-0" />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{friend.name}</DrawerTitle>
          <DrawerDescription>
            {friend._id}
          </DrawerDescription>

        </DrawerHeader>

        <MessageList messageList={messageList} uuid={currentUser?._id} friend={friend} />

        <DrawerFooter>
          <div className="flex h-[100px] gap-3">
            {inputMessage}
            <textarea
              className="size-full ring-1"
              onChange={
              e => {
                setInputMessage(e.target.value);
              }
            }
            />
            <Button
              onClick={
              () => sendMessage({
                message: inputMessage,
                from: currentUser?._id,
                toID: friend._id,
              })
            }
              className="h-full flex-1"
            >
              Submit
            </Button>
          </div>
          <DrawerClose onClick={() => setOpen(!isOpen)}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
