import { useCurrentUser } from '@/hooks/useCurrentUser'

export function OptionList() {
  const currentUser = useCurrentUser()

  return (
    <div>
      {currentUser ? <p>{currentUser.email}</p> : <p>No user logged in</p>}
    </div>
  )
}
