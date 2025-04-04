import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allow external access
    port: 5173,  // Ensure it's running on the right port
    strictPort: true,  // Enforce the port
    allowedHosts: ['reg.multisense.pro'],  // Allow this domain
  },
});
