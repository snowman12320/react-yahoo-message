import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '@/pages/ErrorPage';
import LogInPage from '@/pages/login/LogInPage';
import Layout from '@/pages/Layout/Layout';
import RegisterPage from '@/pages/login/RegisterPage';
import OptionList from '@/pages/optionList/';

import { loginGuard } from '@/api';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        // loader: async () => Promise.all([fetchNewsList(), fetchCulinaryList(), fetchRoomList()]),
        element: <LogInPage />,
      },
      {
        path: 'login/RegisterPage',
        element: <RegisterPage />,
      },
      {
        path: 'optionList/',
        loader: loginGuard,
        element: <OptionList />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
