import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import LogInPage from './pages/login/LogInPage'
import RegisterPage from './pages/login/RegisterPage'
import { OptionList } from './pages/optionList/'

const setWindowWidth = () => {
  window.innerWidth = 330
}

function App() {
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

      <main className='flex flex-col items-center justify-center window-body bg-white'>
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
