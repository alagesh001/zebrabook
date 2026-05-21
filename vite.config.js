import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/zebraslot/',
  server: {
    https: {
      key: fs.readFileSync('./cert/key.pem'),
      cert: fs.readFileSync('./cert/cert.pem'),
    },
    host: true,   // IMPORTANT: allows mobile to connect
    port: 5173,
  },
})
