import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dev-only: mirrors the production reverse proxy so relative links like
    // `/admin` (Filament panel) resolve to the Laravel backend instead of
    // the Vite dev server. Adjust the target if the backend runs elsewhere.
    proxy: {
      '/admin': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
