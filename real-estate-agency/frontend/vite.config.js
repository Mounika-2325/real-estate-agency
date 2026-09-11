import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/real-estate-agency/' : '/',
  server: {
    port: 3000,
    open: false,
  },
}));
