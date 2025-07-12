// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // this makes any `global` reference use `globalThis` under the hood
    global: 'globalThis'
  },
  optimizeDeps: {
    // ensure Draft-JS and its fbjs helpers are properly pre-bundled
    include: ['draft-js', 'react-draft-wysiwyg', 'fbjs']
  }
})
