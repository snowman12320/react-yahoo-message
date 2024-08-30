// eslint-disable-next-line import/no-extraneous-dependencies
import liff from '@line/liff';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import '@/styles/globals.css';
import '@/styles/font.css';
import '@/index.scss';
import 'xp.css/dist/XP.css';

liff
  .init({ liffId: import.meta.env.VITE_LIFF_ID || '' })
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  })
  .catch(e => {
    console.error(`LIFF error: ${e.message}`);
  });
