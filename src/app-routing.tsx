import { createBrowserRouter } from 'react-router-dom';

import { loginGuard } from '@/api';

import ErrorPage from '@/pages/ErrorPage';
import Login from '@/pages/login/LogInPage.tsx';
// import Layout from '@/pages/Layout/Layout.tsx';

export const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Layout />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       path: '',
  //       loader: async () => Promise.all([fetchNewsList(), fetchCulinaryList(), fetchRoomList()]),
  //       element: <Home />,
  //     },
  //   ],
  // },
  {
    path: '/login',
    loader: loginGuard,
    element: <Login />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
