import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/landing-glm5/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/variables" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@styles': '/src/styles',
      '@scripts': '/src/scripts',
      '@assets': '/src/assets'
    }
  }
});