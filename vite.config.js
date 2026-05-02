import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ghufran-arain55-zameenai-backend.hf.space',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});