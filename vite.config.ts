import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { chromeExtension } from "vite-plugin-chrome-extension";

// https://vitejs.dev/config/
const config: UserConfig = {
  //@ts-ignore
  plugins: [react()],

}
if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(chromeExtension() as any)
  config.build = {
    outDir: 'chrome-extension',
    rollupOptions: {
      input: 'src/manifest.json',
    },
  }
}
export default defineConfig(config)
