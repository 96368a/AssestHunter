import { defineConfig } from "@solidjs/start/config";
import UnoCSS from "unocss/vite";
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [UnoCSS(),
  AutoImport({
    imports: [
      'solid-js',
    ],
    dts: true,
  })
],
});
