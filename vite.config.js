import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window'  // 解决 global 和 setImmediate 问题
  },
  server: {
    proxy: {
      '/schedule': {
        target: 'https://api.tvmaze.com', // 代理地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/schedule/, ''), // 重写路径，去掉 /shows
      },
    },
  },
});