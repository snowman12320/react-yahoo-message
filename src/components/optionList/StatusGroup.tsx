import { useState, useCallback, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

import { useCurrentUser } from '@/hooks';
import { Button } from '@/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateProfile } from '@/api';
import { toast } from '../ui/use-toast';

export function StatusGroup() {
  const { setCurrentUser, getCurrentUser } = useCurrentUser();
  const currentUser = getCurrentUser();

  const [status, setStatus] = useState(getCurrentUser()?.onlineStatus);

  useEffect(() => {
    setStatus(currentUser?.onlineStatus);
  }, [currentUser?.onlineStatus]);

  const updateStatus = useCallback(
    (newStatus: string) => {
      if (newStatus !== currentUser?.onlineStatus) {
        setCurrentUser({ ...currentUser, onlineStatus: newStatus });
        updateProfile({ ...currentUser, onlineStatus: newStatus });
        toast({
          description: '狀態已更新',
          variant: 'success',
        });
      }
    },
    [currentUser, setCurrentUser],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-transparent"
      >
        <Button className="w-8 bg-transparent p-0">
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className=" bg-white text-center">
        <DropdownMenuLabel inset={false}>狀態設定</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={newStatus => {
            setStatus(newStatus);
            updateStatus(newStatus);
          }}
        >
          <DropdownMenuRadioItem
            className="fill-yellow-300 text-yellow-300 hover:!text-yellow-300"
            value="online"
          >
            上線
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="fill-red-500 text-red-500 hover:!text-red-500"
            value="busy"
          >
            忙碌
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="fill-gray-300 text-gray-300 hover:!text-gray-300"
            value="offline"
          >
            離線
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
