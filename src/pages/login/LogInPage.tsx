import { LoginForm } from '@/components';

import logout from '@/assets/images/logos/logout.png';

function LogInPage() {
  return (
    <section className="grid h-[95vh] place-items-center">
      <div>
        <img
          src={logout}
          alt="logout"
          className="m-auto h-32 w-auto"
        />
        <LoginForm />
      </div>
    </section>
  );
}

export default LogInPage;
