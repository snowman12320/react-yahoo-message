import { LoginForm } from '@/components';

import logout from '@/assets/images/logos/logout.png';

function LogInPage() {
  return (
    <section className="h-[95vh] grid place-items-center">
      <div>
        <img
          src={logout}
          alt="logout"
          className="w-auto h-32 m-auto"
        />
        <LoginForm />
      </div>
    </section>
  );
}

export default LogInPage;
