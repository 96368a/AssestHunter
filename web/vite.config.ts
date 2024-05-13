/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    solidPlugin(),
    Pages(),
    Unocss(),
    AutoImport({
      imports: [
        'solid-js',
      ],
      dts: true,
      dirs: [
        'src/primitives',
      ],
      packagePresets: ['@solidjs/router','mdui/functions/snackbar.js'],
    }),

  ],
  build: {
    target: 'esnext',
  },
  test: {
    environment: 'jsdom',
    isolate: false,
  },
})
