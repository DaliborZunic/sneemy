import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev: proxy /api to your .NET backend at https://localhost:7265
export default defineConfig({
  plugins: [react()],
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
