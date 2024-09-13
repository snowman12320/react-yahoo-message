import { Outlet } from 'react-router-dom';

import { useEffect } from 'react';
import { useLoading } from '@/hooks';
import {
  NavbarComp, Toaster, LoaderComp,
} from '@/components';

const setWindowWidth = () => {
  window.innerWidth = 330;
};

function Layout() {
  const { getIsLoading } = useLoading();
  const isLoading = getIsLoading();

  useEffect(() => {
    setWindowWidth();
  }, []);

  return (
    <div className="window  container h-screen  overflow-hidden rounded-xl !bg-white px-0">
      <NavbarComp />

      <main className="window-body relative !m-[3px] flex h-[93vh] flex-col items-center justify-start bg-white">
        {isLoading && (
        <LoaderComp />
        )}
        <Toaster />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
