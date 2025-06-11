import { defineConfig } from 'vite'
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { chromeExtension } from "vite-plugin-chrome-extension";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), chromeExtension()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/manifest.json',
    },
  }
})
