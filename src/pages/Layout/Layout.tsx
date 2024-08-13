import { Outlet } from 'react-router-dom';

import { useEffect } from 'react';
import useIsLoading from '@/hooks/useIsLoading';
import { Loader2, NavbarComp } from '@/components/';

const setWindowWidth = () => {
  window.innerWidth = 330;
};

function Layout() {
  const isLoading = useIsLoading();

  useEffect(() => {
    setWindowWidth();
  }, []);

  return (
    <div className="rounded-xl  overflow-hidden container  px-0 window !bg-white h-screen">
      <NavbarComp />

      <main className="flex flex-col items-center justify-start window-body bg-white relative h-[95vh]">
        {isLoading && (
          <section className="absolute inset-0 backdrop-blur-lg">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader2 className="mr-2 size-5 animate-spin " />
            </div>
          </section>
        )}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
