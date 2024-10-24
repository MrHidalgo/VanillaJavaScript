import { sync } from "glob";
import legacy from '@vitejs/plugin-legacy';

export default {
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: sync("./src/**/*.html".replace(/\\/g, "/")),
    },
  },
  plugins: [
    legacy(),
  ],
};