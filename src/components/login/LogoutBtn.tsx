import { LogOut } from 'lucide-react'

import { useLogout } from '@/utils/auth'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
interface LogoutBtnProps {
  buttonText: string
  className?: string
}

export function LogoutBtn({ buttonText, className }: LogoutBtnProps) {
  const logout = useLogout()

  return (
    <div className='yahoo-btn-cls'>
      <Button
        onClick={logout}
        className={cn(
          className,
          'flex bg-transparent p-0 hover:bg-transparent',
          buttonText !== '' && 'space-x-3',
        )}
        type='submit'
      >
        <span>{buttonText}</span>
        <LogOut />
      </Button>
    </div>
  )
}
