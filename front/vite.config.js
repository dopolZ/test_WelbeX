import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      port: 5173, // Порт для локальной разработки
      base: './',
      host: '0.0.0.0',
      watch: {
         ignored: ['**/node_modules/**', '**/dist/**', '**/build/**']
      }
   }
})
