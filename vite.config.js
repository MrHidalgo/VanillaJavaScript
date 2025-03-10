import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { sync } from 'glob';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: './',
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: sync('./src/**/*.html'.replaceAll('\\', '/')),
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (/\.css$/.test(assetInfo.name)) {
            return 'css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
            return 'images/[name][extname]';
          }
          if (/\.(woff2?|ttf|otf|eot)$/.test(assetInfo.name)) {
            return 'fonts/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
      }
    }
  },
  plugins: [
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'public/images/**/*'),
          dest: 'images'
        }
      ]
    })
  ]
});
