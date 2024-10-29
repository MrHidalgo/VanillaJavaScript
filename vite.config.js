import legacy from '@vitejs/plugin-legacy';
import { sync } from 'glob';

export default {
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
  plugins: [legacy()]
};