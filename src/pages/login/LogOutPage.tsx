import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function LogOutComp() {
  return (
    <section>
      <img
        src={'/src/assets/images/logos/logo-logout.png'}
        alt='logout'
        className='w-32'
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
    </section>
  )
}

export default LogOutComp
