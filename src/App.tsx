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
    <main className='flex flex-col items-center justify-center h-screen'>
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
  )
}

export default App
