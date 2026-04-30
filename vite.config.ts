import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 讓前端可以讀取 import.meta.env.WHATSAPP_PHONE
  envPrefix: ['VITE_', 'WHATSAPP_'],
})
