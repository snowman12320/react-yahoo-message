import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '@/pages/ErrorPage';
import LogInPage from '@/pages/login/LogInPage';
import Layout from '@/pages/Layout/Layout';
import RegisterPage from '@/pages/login/RegisterPage';
import OptionList from '@/pages/optionList/';

import { notLoggedGuard, isLoggedGuard } from '@/api';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        loader: isLoggedGuard,
        element: <LogInPage />,
      },
      {
        path: 'login/RegisterPage',
        element: <RegisterPage />,
      },
      {
        path: 'optionList/',
        loader: notLoggedGuard,
        element: <OptionList />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
