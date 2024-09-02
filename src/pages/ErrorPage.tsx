import { useRouteError, Link } from 'react-router-dom';
import logo from '@/assets/images/logos/logout.png';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img
        src={logo}
        alt="logo"
        className="mx-auto size-20 object-contain"
      />
      <h1 className="text-2xl  font-bold text-red-500 sm:text-4xl ">
        404 Not Found
      </h1>
      <p className="text-sm">
        Sorry, the page you are looking for could not be found.
      </p>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
}

export default ErrorPage;
