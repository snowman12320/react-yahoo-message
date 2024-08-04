import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

import LogInPage from '@/pages/login/LogInPage'
import RegisterPage from '@/pages/login/RegisterPage'
import { OptionList } from '@/pages/optionList/'
import { Loader2 } from '@/components/'

const setWindowWidth = () => {
  window.innerWidth = 330
}

function App() {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading)

  useEffect(() => {
    setWindowWidth()
  }, [])

  return (
    <div className='rounded-xl  overflow-hidden container  px-0 window !bg-white h-screen'>
      <nav className='title-bar !p-4'>
        <div className='title-bar-text flex items-center gap-1'>
          <img
            src='/src/assets/images/logos/logins.png'
            className='size-6 object-contain'
            alt='logo'
          />
          <p className='text-white'>Yahoo！即時通</p>
        </div>

        <div className='title-bar-controls'>
          <button aria-label='Minimize'></button>
          <button aria-label='Restore'></button>
          <button aria-label='Close'></button>
        </div>
      </nav>

      <main className='flex flex-col items-center justify-start window-body bg-white relative h-[95vh]'>
        {isLoading && (
          <section className='absolute inset-0 backdrop-blur-lg'>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Loader2 className='mr-2 size-5 animate-spin ' />
            </div>
          </section>
        )}

        <Routes>
          <Route
            path='/'
            element={<LogInPage />}
          />
          <Route
            path='/login/RegisterPage'
            element={<RegisterPage />}
          />
          <Route
            path='/optionList/'
            element={<OptionList />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
