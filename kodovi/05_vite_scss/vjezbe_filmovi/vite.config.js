import { resolve } from 'path'

export default {
  root: resolve(import.meta.dirname, 'src'),
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'src/index.html'),
        movies: resolve(import.meta.dirname, 'src/movies.html'),
        about: resolve(import.meta.dirname, 'src/about.html')
      },
    }
  },
  server: {
    port: 8080,
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  // Optional: Silence Sass deprecation warnings. See note below.
  css: {
     preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'color-functions',
            'global-builtin',
            'if-function',
          ],
        },
     },
  },
}