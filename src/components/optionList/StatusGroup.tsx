import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function StatusGroup() {
  const [position, setPosition] = React.useState('bottom')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='bg-transparent w-8 p-0'>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=' bg-white'>
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={setPosition}
        >
          <DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='bottom'>Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
