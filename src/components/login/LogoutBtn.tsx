import { useLogout } from '@/utils/auth'
import { Button } from '@/components/ui/button'

export function LogoutBtn() {
  const logout = useLogout()

  return (
    <Button
      onClick={logout}
      className='w-[100px]'
      type='submit'
    >
      登出
    </Button>
  )
}
