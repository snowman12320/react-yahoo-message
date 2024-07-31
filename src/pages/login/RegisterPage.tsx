import { RegisterForm } from '@/components/login/RegisterForm'

function RegisterPage() {
  return (
    <section className='container'>
      <img
        src={'/src/assets/images/logos/logout.png'}
        alt='logout'
        className='w-auto h-32 m-auto'
      />

      <RegisterForm />
    </section>
  )
}

export default RegisterPage
