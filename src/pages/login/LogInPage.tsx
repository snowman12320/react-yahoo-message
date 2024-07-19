import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

function LogInComp() {
  return (
    <section>
      <img
        src={'/src/assets/images/logos/logins.png'}
        alt='login'
        className='w-auto h-32 '
      />
      <Link to='/'>
        <Button
          onClick={() => {
            console.log('LogOutPage')
          }}
        >
          LogOutPage
        </Button>
      </Link>
    </section>
  )
}

export default LogInComp
