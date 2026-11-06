import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    // Lets the dev server be opened at http://vision-lift.local:5173
    allowedHosts: ['vision-lift.local'],
  },
  build: { outDir: 'dist', emptyOutDir: true },
});
