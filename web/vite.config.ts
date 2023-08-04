import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@root': path.join(__dirname, '../'),
      '@web': path.join(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1024,
  },
});
