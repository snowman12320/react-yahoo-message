import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function LogInComp() {
  return (
    <section>
      <img
        src={'/src/assets/images/logos/logo-logout.png'}
        alt='logout'
        className='w-32'
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
