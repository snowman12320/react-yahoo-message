import { LoginForm } from '@/components/login/LoginForm'

function LogInPage() {
  return (
    <section className='container'>
      <img
        src={'/src/assets/images/logos/logout.png'}
        alt='logout'
        className='w-auto h-32 m-auto'
      />

      <LoginForm />
    </section>
  )
}

export default LogInPage
