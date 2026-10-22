import { defineConfig } from 'vite'
import adminApi from './vite-plugin-admin-api.js'

export default defineConfig({
  // adminApi is `apply: 'serve'`, so the /api routes behind the /admin
  // dashboard exist in dev only and are never part of a production build.
  plugins: [adminApi()],
})
