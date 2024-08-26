import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // vercel
  // https://react-yahoo-message-nojs2azmf-snowman12320s-projects.vercel.app/
  // gh-page
  // base: process.env.NODE_ENV === 'production' ? '/react-yahoo-message/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
