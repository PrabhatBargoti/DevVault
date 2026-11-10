import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const clientEnv = ['API_BASE_URL', 'SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY']
  const define = Object.fromEntries(
    clientEnv
      .filter((key) => env[key])
      .map((key) => [`import.meta.env.${key}`, JSON.stringify(env[key])]),
  )

  return {
    plugins: [react(), tailwindcss()],
    define,
  }
})
