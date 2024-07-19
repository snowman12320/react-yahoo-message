import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { LoginForm } from '@/components/ui/LoginForm'

function LogOutComp() {
  return (
    <section className='w-56'>
      <img
        src={'/src/assets/images/logos/logout.png'}
        alt='logout'
        className='w-auto h-32 m-auto'
      />
      <Link to='/login/LogInPage'>
        <Button
          onClick={() => {
            console.log('LogInPage')
          }}
        >
          LogInPage
        </Button>
      </Link>

      <LoginForm />
    </section>
  )
}

export default LogOutComp
