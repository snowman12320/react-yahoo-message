import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import '@/styles/globals.css';
import '@/styles/font.css';
import '@/index.scss';
import 'xp.css/dist/XP.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
