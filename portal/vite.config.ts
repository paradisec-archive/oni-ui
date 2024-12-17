import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

import { ldacaProxy } from './ldaca-proxy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // NOTE: Temp so we can transform the old LDaCA API
    {
      name: 'ldaca-proxy',
      configureServer(server) {
        server.middlewares.use(ldacaProxy);
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
