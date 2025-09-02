// vite.config.ts 파일
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import svgr from 'vite-plugin-svgr';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      types: path.resolve(__dirname, 'src/types'),
      config: path.resolve(__dirname, 'src/config'),
      components: path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets'),
      lib: path.resolve(__dirname, 'src/lib'),
    },
  },
});
