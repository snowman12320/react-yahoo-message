import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react'; // 引入 lazy 和 Suspense
import { LoaderComp } from '@/components';

import { notLoggedGuard, isLoggedGuard } from '@/api';

const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const LogInPage = lazy(() => import('@/pages/login/LogInPage'));
const Layout = lazy(() => import('@/pages/Layout/Layout'));
const RegisterPage = lazy(() => import('@/pages/login/RegisterPage'));
const OptionList = lazy(() => import('@/pages/optionList'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<LoaderComp />}><Layout /></Suspense>,
    errorElement: <Suspense fallback={<LoaderComp />}><ErrorPage /></Suspense>,
    children: [
      {
        path: '',
        loader: isLoggedGuard,
        element: <Suspense fallback={<LoaderComp />}><LogInPage /></Suspense>,
      },
      {
        path: 'login/RegisterPage',
        element: <Suspense fallback={<LoaderComp />}><RegisterPage /></Suspense>,
      },
      {
        path: 'optionList/',
        loader: notLoggedGuard,
        element: <Suspense fallback={<LoaderComp />}><OptionList /></Suspense>,
      },
      {
        path: '*',
        element: <Suspense fallback={<LoaderComp />}><ErrorPage /></Suspense>,
      },
    ],
  },
]);
