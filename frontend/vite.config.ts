import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const port: string | undefined = process.env.FRONTEND_PORT
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(port ?? '3000')
  }
})
