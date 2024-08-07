import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function StatusGroup() {
  const [position, setPosition] = React.useState('bottom');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-transparent "
      >
        <Button className="bg-transparent w-8 p-0 ">
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white text-center">
        <DropdownMenuLabel inset={false}>狀態設定</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={setPosition}
        >
          <DropdownMenuRadioItem
            className="text-yellow-300 fill-yellow-300 hover:!text-yellow-300"
            value="online"
          >
            上線中
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="text-red-500 fill-red-500 hover:!text-red-500"
            value="busy"
          >
            忙碌中
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="text-gray-300 fill-gray-300 hover:!text-gray-300"
            value="unavailable"
          >
            已下線
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
