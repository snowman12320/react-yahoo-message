import { RegisterForm } from '@/components/login/RegisterForm'

function RegisterPage() {
  return (
    <section className='container grid place-items-center'>
      <div>
        <img
          src={'/src/assets/images/logos/logout.png'}
          alt='logout'
          className='w-auto h-32 m-auto'
        />
        <RegisterForm />
      </div>
    </section>
  )
}

export default RegisterPage
