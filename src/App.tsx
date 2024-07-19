import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import LogInPage from './pages/login/LogInPage'
import LogOutPage from './pages/login/LogOutPage'

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
          element={<LogOutPage />}
        />
        <Route
          path='/login/LogInPage'
          element={<LogInPage />}
        />
      </Routes>
    </main>
  )
}

export default App
