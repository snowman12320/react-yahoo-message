import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import.meta.env

import App from './App.tsx'
import { store } from './app/store'

import 'xp.css/dist/XP.css'
import '@/styles/globals.css'
import '@/styles/font.css'
import '@/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
