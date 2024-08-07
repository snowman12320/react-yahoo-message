import { useRouteError } from 'react-router-dom';
import logo from '@/assets/images/logos/logout.png';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <img
        src={logo}
        alt="logo"
        className="size-20 object-contain mx-auto"
      />
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
    </>
  );
}

export default ErrorPage;
