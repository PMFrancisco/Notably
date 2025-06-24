import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { copyFileSync } from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // Custom plugin to copy webextension-polyfill for Firefox compatibility
    {
      name: 'copy-polyfill',
      generateBundle() {
        try {
          // Copy webextension-polyfill to dist for Firefox
          copyFileSync(
            resolve(__dirname, 'node_modules/webextension-polyfill/dist/browser-polyfill.js'),
            resolve(__dirname, 'dist/browser-polyfill.js')
          );
        } catch (error) {
          console.warn('Could not copy webextension-polyfill:', error);
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"),
        background: resolve(__dirname, "src/background/index.ts"),
        content: resolve(__dirname, "src/content/index.ts")
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return '[name].js';
        },
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]"
      }
    },
    copyPublicDir: true
  },
  publicDir: 'public',
  define: {
    // Define global for compatibility
    global: 'globalThis',
  }
});
