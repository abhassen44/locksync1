import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['three'], // Specify three.js as external
    },
  },
  
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
