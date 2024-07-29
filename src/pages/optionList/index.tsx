import { useCurrentUser } from '@/hooks/useCurrentUser'
import { LogoutBtn } from '@/components/login/LogoutBtn'

export function OptionList() {
  const currentUser = useCurrentUser()

  return (
    <div>
      <div>
        {currentUser ? <p>{currentUser.email}</p> : <p>No user logged in</p>}
      </div>

      <LogoutBtn />
    </div>
  )
}
