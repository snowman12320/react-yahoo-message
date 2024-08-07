import { RegisterForm } from '@/components';
import logout from '@/assets/images/logos/logout.png';

function RegisterPage() {
  return (
    <section className="grid place-items-center h-[95vh]">
      <div>
        <img
          src={logout}
          alt="logout"
          className="w-auto h-32 m-auto"
        />
        <RegisterForm />
      </div>
    </section>
  );
}

export default RegisterPage;
