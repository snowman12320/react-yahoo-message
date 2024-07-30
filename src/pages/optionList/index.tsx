import { useCurrentUser } from '@/hooks/useCurrentUser'
import { LogoutBtn } from '@/components/login/LogoutBtn'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function OptionList() {
  const currentUser = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  return (
    <div>
      <div>
        {currentUser ? <p>{currentUser.email}</p> : <p>No user logged in</p>}
      </div>

      <LogoutBtn />
    </div>
  )
}
