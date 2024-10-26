import legacy from '@vitejs/plugin-legacy';
import { sync } from 'glob';

export default {
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: sync('./src/**/*.html'.replaceAll('\\', '/'))
    }
  },
  plugins: [legacy()]
};
