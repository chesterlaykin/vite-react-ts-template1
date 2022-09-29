import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, './src'),
      "@@": resolve(__dirname, './src/components'), 
      "#root": __dirname,
    },
  },
  css: {
    preprocessorOptions: {
      scss: { 
        additionalData: `@import "@/assets/scss/start-files/index.scss";`, 
      },
    },
  },
});
