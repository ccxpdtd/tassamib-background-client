import { defineConfig } from 'vite'
import path from 'path'
//svg插件
import vue from '@vitejs/plugin-vue'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //svg插件
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  server: {
    host: '0.0.0.0', // 可以让外部访问 5173
    port: 9003,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9001', // 云服务器本地 9001
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '/api'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/index.scss" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // vite.config.ts（修正后）


})
