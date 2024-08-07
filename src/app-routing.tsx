import { createBrowserRouter } from 'react-router-dom';

import { loginGuard } from '@/api';

import ErrorPage from '@/pages/ErrorPage';
import Login from '@/pages/login/LogInPage.tsx';
import Layout from '@/pages/Layout/Layout.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        loader: async () => Promise.all([fetchNewsList(), fetchCulinaryList(), fetchRoomList()]),
        element: <Home />,
      },
      {
        path: '/room',
        loader: async () => fetchRoomList(),
        element: <RoomMaster />,
      },
      {
        path: '/room/:id',
        loader: async ({ params }) => fetchRoom(params.id ?? ''),
        element: <RoomDetail />,
      },
      {
        path: '/my-account',
        element: <MyAccount />,
      },
      {
        path: '/room/:id/booking',
        element: <Booking />,
      },
      {
        path: '/booking',
        element: <Booking />,
      },
    ],
  },
  {
    path: '/login',
    loader: loginGuard,
    element: <Login />,
  },
  {
    path: '/registration',
    loader: loginGuard,
    element: <Registration />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
