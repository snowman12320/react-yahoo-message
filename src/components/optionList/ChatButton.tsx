import { useEffect, useState } from 'react';

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
import { useWsFunc, useCurrentUser } from '@/hooks';
import { KEY_TOKEN, getFromStorage } from '@/api/storage-management';
import { FriendListResponse, MessageListType } from '@/types';

export function ChatButton({ friend }:{ friend: FriendListResponse[0] }) {
  const { onMounted, messageList } = useWsFunc();
  const { getCurrentUser } = useCurrentUser();
  const currentUser = getCurrentUser();
  const token = getFromStorage(KEY_TOKEN, 'SESSION');
  const [handleMessageList, setHandleMessageList] = useState<MessageListType[] | undefined>();
  const [isOpen, setOpen] = useState(false);
  const [isTimeOutOpen, setTimeOutOpen] = useState(false);

  useEffect(() => {
    async function handleOnMounted() {
      if (token && isOpen) {
        await onMounted(token);
      }
    }
    handleOnMounted();
  }, [token, isOpen]);

  useEffect(() => {
    setHandleMessageList(messageList);
  }, [messageList]);

  useEffect(
    () => {
      if (isOpen) {
        setTimeout(() => {
          setTimeOutOpen(true);
        }, 1000);
      }

      if (!isOpen && isTimeOutOpen) {
        setTimeOutOpen(false);
      }
    },
    [isOpen],
  );

  return (
    <Drawer open={isTimeOutOpen} onOpenChange={setOpen}>
      <DrawerTrigger className="absolute inset-0" />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{friend.name}</DrawerTitle>
          <DrawerDescription>
            {friend._id}
          </DrawerDescription>

        </DrawerHeader>

        <MessageList messageList={handleMessageList} uuid={currentUser?._id} friend={friend} />

        <DrawerFooter>
          <div className="flex h-[100px] gap-3">
            <textarea className="size-full ring-1" />
            <Button className="h-full flex-1">Submit</Button>
          </div>
          <DrawerClose onClick={() => setOpen(!isOpen)}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
