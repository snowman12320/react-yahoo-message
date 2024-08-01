import { LoginForm } from '@/components/login/LoginForm'

function LogInPage() {
  return (
    <section className='container grid place-items-center'>
      <div>
        <img
          src={'/src/assets/images/logos/logout.png'}
          alt='logout'
          className='w-auto h-32 m-auto'
        />
        <LoginForm />
      </div>
    </section>
  )
}

export default LogInPage
