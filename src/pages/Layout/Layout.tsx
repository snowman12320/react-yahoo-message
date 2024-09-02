import { Outlet } from 'react-router-dom';

import { useEffect } from 'react';
import { useLoading } from '@/hooks';
import {
  Loader2, NavbarComp, Toaster,
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
          <section className="absolute inset-0 z-10 backdrop-blur-lg">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader2 className="mr-2 size-5 animate-spin " />
            </div>
          </section>
        )}
        <Toaster />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
