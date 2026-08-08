import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Dev: proxy /api to your .NET backend at https://localhost:7265
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@auth': path.resolve(__dirname, './src/auth'),
      '@api': path.resolve(__dirname, './src/api'),
      '@modules': path.resolve(__dirname, './src/modules'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7265',
        changeOrigin: true,
        secure: false, // dev cert
      },
    },
  },
})
