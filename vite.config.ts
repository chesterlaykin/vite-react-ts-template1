import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
// import {resolve} from 'path';
// const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // alias: [
    //   {find: '@', replacement: resolve(__dirname, 'src'), }
    // ]
    alias: {
      "@": fileURLToPath( new URL("./src", import.meta.url)),
    },
  },
});
