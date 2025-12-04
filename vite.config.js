import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      store: '/src/store',
      utils: '/src/utils',
      'styled-system': '/styled-system'
    }
  }
})
